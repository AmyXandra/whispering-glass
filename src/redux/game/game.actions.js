// import axios from "axios";
import { gameService } from "./game.service";
import { setSeasonSchedule, setIsLoading } from "./game.slice";

export const getSeasonSchedule = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await gameService.getSeasonSchedule();
    dispatch(setSeasonSchedule(response));
    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
  }
};
