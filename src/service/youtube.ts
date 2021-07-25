import axios, { AxiosInstance } from 'axios';

export default class Youtube {
  private readonly youtube: AxiosInstance;

  constructor(key: String) {
    this.youtube = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: {
        key: key,
      },
    });
  }

  // 실시간 인기 영상 리스트 불러오기
  async mostPopular() {
    const response = await this.youtube.get('videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 25,
      },
    });
    return response.data.items;
  }

  // youtube 영상 검색
  async search(query: string) {
    //  template literal 사용 URL ${query}
    //  template literal 사용 시 Backticks(`) 사용 필수
    const response = await this.youtube.get('search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 25,
      },
    });

    return response.data.items.map((item: any) => ({
      ...item,
      id: item.id.videoId,
    }));
  }
}
