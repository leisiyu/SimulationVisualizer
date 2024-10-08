import { _decorator, Button, Component, Node, Sprite, SpriteFrame, find, Slider } from 'cc';
const { ccclass, property } = _decorator;
import { StatesData } from './StatesData';
// import { EventsLogData } from './EventsLogData';

@ccclass('MainPage')
export class MainPage extends Component {

    map: Node
    slider: Node
    controlBg: Node

    start() {
        // var root = find('Canvas')
        this.map = this.node.getChildByName("map")
        this.controlBg = this.node.getChildByName("controlBackground")
        this.slider = this.controlBg.getChildByName("slider")
        // console.log("lalala" + this.node.children)
        // for (let i = 0; i < 6; i ++) {
        //     var child = this.node.children[i]
        //     console.log("lalala" + i + child.name)
        // }

        // EventsLogData.initData()
    }

    update(deltaTime: number) {
        this.slider.getComponent(Slider).progress = StatesData.getReadIdx() / StatesData.getStatesLog().length
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

    onSlideTouched(){
        StatesData.setPauseStatus(true)
        var newIdx = Math.floor(this.slider.getComponent(Slider).progress * StatesData.getStatesLog().length)
        StatesData.setReadIdx(newIdx)
        StatesData.setJumpState(true)
        
    }
}

