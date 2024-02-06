import { _decorator, Button, Component, Node, Sprite, SpriteFrame, find } from 'cc';
const { ccclass, property } = _decorator;
import { StatesData } from './StatesData';

@ccclass('MainPage')
export class MainPage extends Component {

    map: Node

    start() {
        var root = find('Cavans')
        this.map = root.getChildByName("map")

    }

    update(deltaTime: number) {
        
    }

    onPauseClicked(){
        var isPause = StatesData.getPauseStatus()
        StatesData.setPauseStatus(!isPause)
    }

    onLeftClicked(){
        StatesData.setPauseStatus(true)
        StatesData.idxDecrement()
        
    }

    onRightClicked(){
        StatesData.setPauseStatus(true)
        StatesData.idxIncrement()
    }
}

