import axios from "../../plugins/axios.plugin";

class GameService {
  //   baseServicePath = "/";

  // sportId=1: MLB (1 represents Major League Baseball)
  // season=2024: The season year
  // gameType=R: Regular season games (R = Regular Season, P = Postseason, S = Spring Training)
  getSeasonSchedule() {
    return axios.get(`/v1/schedule?sportId=1&season=2024&gameType=R`);
  }

  getAllTeams() {
    return axios.get(`/v1/teams`);
  }

  getScheduleHighlights() {
    return axios.get(
      `/v1/schedule?sportId=1&startDate=2024-08-02&language=en&hydrate=game(content(highlights(highlights)))&endDate=2024-08-04`
    );
  }

  setNewAddress(params) {
    return axios.post(`${this.baseServicePath}/store`, params);
  }
}
export const gameService = new GameService();
