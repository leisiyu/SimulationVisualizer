import { _decorator, AssetManager, resources, TextAsset, Component, Node, Prefab, SpriteFrame, instantiate, Sprite, Color, Button, Label, JsonAsset } from 'cc';
import { StatesData } from './StatesData';
import { stat } from 'fs';
const { ccclass, property } = _decorator;

@ccclass('Map')
export class Map extends Component {
    @property(Prefab)
    mapGrid: Prefab = null

    @property(Prefab)
    character: Prefab = null

    mapData = []
    mapSize = []
    characters = {}
    readIdx = 0

    lblTime: Node

    start() {
        this.lblTime = this.node.getChildByName("lblTime")

        resources.load("./CityMap", (err, res:TextAsset) => {
            // console.info(res.text)
            this.mapData = JSON.parse(res.text)
            // console.info(this.mapData.length)
            this.mapSize = [this.mapData.length, this.mapData[0].length]
            console.info(this.mapSize)

            for (let i = 0; i < this.mapData.length; i++) {
                for (let j = 0; j < this.mapData[0].length; j++) {            
                    
                        const node = instantiate(this.mapGrid)
                        node.setPosition((i - 1) * 10, (this.mapData[0].length - j) * 10)
                        if (this.mapData[i][j] == 'r') {
                            node.getComponent(Sprite).color = (Color.BLACK)
                        }
                        
                    
                    this.node.addChild(node)
                }
            }

            
        })
        // var mapSize = [mapData.length, mapData[0].length]

        
    }

    update(deltaTime: number) {
        if (!StatesData.getPauseStatus()) {
            this.refreshMap()   
            StatesData.idxIncrement()      
        } else if (this.readIdx != StatesData.getReadIdx()) {
            this.refreshMap()
        }
        this.readIdx = StatesData.getReadIdx() 
    }

    refreshMap(){
        var stateInfo = StatesData.getDataByIdx()
        var stateIdx = StatesData.getReadIdx()

        if (stateInfo.frameType == "key"){
            for (let [key, value] of Object.entries(this.characters)){
                value.setPosition(stateInfo[key][0] * 10, (this.mapData[0].length - stateInfo[key][1]) * 10)
            }
            return
        }

        var characterName = stateInfo["N"]
        if (StatesData.getJumpState()){
            var keyFrameIdx = Math.floor(stateIdx / 1000) * 1001 - 1
            var keyFrame
            if (keyFrameIdx < 1000){
                keyFrame = []
            } else {
                keyFrame = StatesData.getDataByIdx(keyFrameIdx)
            }
             
            for (let i = keyFrameIdx + 1; i <= stateIdx; i++){
                var tempData = StatesData.getDataByIdx(i)
                keyFrame[tempData["N"]] = {
                    P: tempData["P"],
                    S: tempData["S"],
                }
            }

            for (let [key, value] of Object.entries(keyFrame)){
                if (key != "frameType"){
                    if (this.characters[key] == null){
                        this.createCharacterNode(value["P"], key)
                    } else {
                        this.characters[key].setPosition(value["P"][0] * 10, (this.mapData[0].length - value["P"][1]) * 10)
                    }
                }
            }
            StatesData.setJumpState(false)
        } else {
            
            if (this.characters[characterName] == null) {
                this.createCharacterNode(stateInfo["P"], stateInfo["N"])
            } else {
                this.characters[characterName].setPosition(stateInfo["P"][0] * 10, (this.mapData[0].length - stateInfo["P"][1]) * 10)
            }
        }

        this.lblTime.getComponent(Label).string = "Time: " + stateInfo["T"]
    }

    createCharacterNode(pos, name){
        // var characterName = stateInfo["N"]
        const node = instantiate(this.character)
        node.setPosition(pos[0] * 10, (this.mapData[0].length - pos[1]) * 10)
        var nodeColor
        if (name[0] == "a") {
            nodeColor = Color.RED
        } else if (name[0] == "s") {
            nodeColor = Color.BLUE
        } else {
            nodeColor = Color.GREEN
        }
        node.getComponent(Sprite).color = nodeColor
        var lblName = node.getChildByName("lblName")
        lblName.getComponent(Label).string = name
        this.node.addChild(node)
        this.characters[name] = node
    }

}

