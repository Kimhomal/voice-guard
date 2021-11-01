import axios, { AxiosInstance } from 'axios';

export default class Youtube {
  private readonly youtube: AxiosInstance;
  private pageToken: string;
  private query: string;

  constructor(key: String) {
    this.youtube = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: {
        key: key,
      },
    });

    this.pageToken = '';
    this.query = '';
  }

  // 실시간 인기 영상 리스트 불러오기
  async mostPopular(pageToken?: boolean) {
    if (!pageToken) {
      this.reset();
    }

    const response = await this.youtube.get('videos', {
      params: {
        part: 'snippet,contentDetails',
        chart: 'mostPopular',
        regionCode: 'KR',
        pageToken: pageToken && this.pageToken ? this.pageToken : '',
        maxResults: 24,
      },
    });

    this.pageToken = response.data.nextPageToken;
    console.log(response.data.items);
    return response.data.items;
  }

  // youtube 영상 검색
  async search(query: string, pageToken?: boolean) {
    if (!pageToken) {
      this.reset();
      this.query = query;
    }

    //  template literal 사용 URL ${query}
    //  template literal 사용 시 Backticks(`) 사용 필수
    const search = await this.youtube.get('search', {
      params: {
        part: 'snippet',
        q: pageToken ? this.query : query,
        type: 'video',
        pageToken: pageToken && this.pageToken ? this.pageToken : '',
        maxResults: 24,
      },
    });

    this.pageToken = search.data.nextPageToken;

    const list: Array<string> = [];

    search.data.items.map((item: any) => {
      list.push(item.id.videoId);
    });

    const response = await this.youtube.get('videos', {
      params: {
        part: 'snippet,contentDetails',
        id: list.join(','),
        maxResults: 24,
      },
    });

    return response.data.items;
    // return response.data.items.map((item: any) => ({
    //   ...item,
    //   id: item.id.videoId,
    // }));
  }

  private reset() {
    this.pageToken = '';
    this.query = '';
  }
}
