import uuidv from 'uuid';

import {getCookie, setCookie} from './cookie-helper'
var GameHelper =  {
      initGame: (Config) => {
        let GameId = uuidv.v4();
        setCookie(GameId, Config, 1);
        return GameId;
      },
      GetGameById: (Id) => {
        return getCookie(Id);
      }
}

export default GameHelper;