export default class YoutubeOAuth {
  private readonly OAUTH2_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  private readonly OAUTH2_CLIENT_ID = process.env.REACT_APP_YOUTUBE_CLIENT_ID;
  private readonly OAUTH2_SCOPES = [
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/youtube.force-ssl',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtubepartner',
  ];
  private gapi: any;

  constructor() {
    console.log('YoutubeOAuth constructor');
    const tag = document.createElement('script');
    tag.src = 'https://apis.google.com/js/api.js';
    tag.async = false;
    tag.onload = () => {
      console.log((window as any).gapi);
      this.gapiInit((window as any).gapi);
    };
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
  }

  async gapiInit(gapi: any) {
    this.gapi = gapi;
    await this.gapi.load('client:auth2', () => {
      this.gapi.auth2
        .init({
          client_id: this.OAUTH2_CLIENT_ID,
        })
        .then(() => {
          this.gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen((isSignedIn: boolean) => {
              console.log(isSignedIn);
            });
        });
    });
  }

  async authenticate() {
    return await this.gapi.auth2
      .getAuthInstance()
      .signIn({ scope: this.OAUTH2_SCOPES.join(' ') })
      .then(
        function () {
          console.log('Sign-in successful');
        },
        function (err: any) {
          console.error('Error signing in', err);
        }
      )
      .then(() => {
        this.loadClient();
      });
  }

  async loadClient() {
    this.gapi.client.setApiKey(this.OAUTH2_API_KEY);
    return await this.gapi.client
      .load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
      .then(
        function () {
          console.log('GAPI client loaded for API');
        },
        function (err: any) {
          console.error('Error loading GAPI client for API', err);
        }
      );
  }
  // 실시간 인기 영상 리스트 불러오기
  async mostPopular() {
    console.log(this.gapi);
    const response = await this.gapi.client.youtube.videos.list({
      part: ['snippet', 'contentDetails'],
      //   chart: 'mostPopular',
      myRating: 'like',
      maxResults: 24,
    });

    console.log(response);
    return response.result.items;
  }

  // 좋아요 영상 리스트 불러오기
  async likeList(token: string) {
    const response = await this.gapi.client.youtube.videos.list({
      part: ['snippet', 'contentDetails'],
      // chart: 'mostPopular',
      myRating: 'like',
      maxResults: 24,
    });
    return response.result.items;
  }

  // youtube 영상 검색
  async search(query: string) {
    const search = await this.gapi.client.youtube.search({
      part: ['snippet'],
      q: query,
      type: 'video',
      maxResults: 24,
    });

    const list: Array<string> = [];

    search.data.items.map((item: any) => {
      list.push(item.id.videoId);
    });

    const response = await this.gapi.client.youtube.videos.list({
      part: ['snippet', 'contentDetails'],
      id: list.join(','),
      maxResults: 24,
    });

    return response.data.items;
  }
}
