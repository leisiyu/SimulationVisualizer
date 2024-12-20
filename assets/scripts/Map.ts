import { _decorator, AssetManager, resources, TextAsset, Component, Node, Prefab, SpriteFrame, instantiate, Sprite, Color, Button, Label, JsonAsset, director, profiler } from 'cc';
import { StatesData } from './StatesData';
import { stat } from 'fs';
const { ccclass, property } = _decorator;

@ccclass('Map')
export class Map extends Component {
    @property(Prefab)
    mapGrid: Prefab = null

    @property(Prefab)
    character: Prefab = null

    @property(Prefab)
    mapGrid50: Prefab = null

    @property(Prefab)
    character50: Prefab = null

    @property(Prefab)
    mapGrid500: Prefab = null

    @property(Prefab)
    character500: Prefab = null

    @property(Prefab)
    mapGrid200: Prefab = null

    @property(Prefab)
    character200: Prefab = null

    mapData = []
    mapSize = []
    characters = {}
    readIdx = 0
    sizeOffset = 10
    characterGrid = null

    lblTime: Node

    start() {
        this.lblTime = this.node.getChildByName("lblTime")
        // profiler.showStats()
        profiler.hideStats()

        resources.load("./CityMap", (err, res:TextAsset) => {
            // console.info(res.text)
            this.mapData = JSON.parse(res.text)
            // console.info(this.mapData.length)
            this.mapSize = [this.mapData.length, this.mapData[0].length]
            var maxSize = this.mapData.length >= this.mapData[0].length ? this.mapData.length : this.mapData[0].length

            var grid = this.mapGrid
            this.characterGrid = this.character
            if (maxSize == 50) {
                grid = this.mapGrid50
                this.sizeOffset = 20
                this.characterGrid = this.character50
            } else if (maxSize == 500) {
                grid = this.mapGrid500
                this.sizeOffset = 2
                this.characterGrid = this.character500
            } else if (maxSize == 200) {
                grid = this.mapGrid200
                this.sizeOffset = 5
                this.characterGrid = this.character200
            }

            for (let i = 0; i < this.mapData.length; i++) {
                for (let j = 0; j < this.mapData[0].length; j++) {            
                    
                        const node = instantiate(grid)
                        node.setPosition((i - 1) * this.sizeOffset, (this.mapData[0].length - j) * this.sizeOffset)
                        if (this.mapData[i][j] == 'r') {
                            node.getComponent(Sprite).color = new Color(188, 189, 220, 255)//(Color.BLACK)
                        } else if (this.mapData[i][j][0] == 'b'){
                            node.getComponent(Sprite).color = new Color(217, 95, 14)//(Color.CYAN)
                        }
                        
                    
                    this.node.addChild(node)
                }
            }

            
        })
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
                value.setPosition(stateInfo[key][0] * this.sizeOffset, (this.mapData[0].length - stateInfo[key][1]) * this.sizeOffset)
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
                        this.createCharacterNode(value["P"], key, value["S"])
                    } else {
                        if (value["S"] == "DIED"){
                            this.characters[key].getComponent(Sprite).color = Color.GRAY
                        } else {
                            var nodeColor
                            if (key[0] == "a") {
                                nodeColor = Color.RED
                            } else if (key[0] == "s") {
                                nodeColor = new Color(44, 127, 184)//Color.BLUE
                            } else {
                                nodeColor = new Color(49, 163, 84, 255) //Color.GREEN
                            }
                            this.characters[key].getComponent(Sprite).color = nodeColor
                        }
                        this.characters[key].setPosition(value["P"][0] * this.sizeOffset, (this.mapData[0].length - value["P"][1]) * this.sizeOffset)
                    }
                }
            }
            StatesData.setJumpState(false)
        } else {
            
            if (this.characters[characterName] == null) {
                this.createCharacterNode(stateInfo["P"], stateInfo["N"], stateInfo["S"])
            } else {
                if (stateInfo["S"] == "DIED"){
                    this.characters[characterName].getComponent(Sprite).color = Color.GRAY
                } else {
                    var nodeColor
                    if (characterName[0] == "a") {
                        nodeColor = Color.RED
                    } else if (characterName[0] == "s") {
                        nodeColor = new Color(44, 127, 184) //Color.BLUE
                    } else {
                        nodeColor = new Color(49, 163, 84, 255) //Color.GREEN
                    }
                    this.characters[characterName].getComponent(Sprite).color = nodeColor
                }
                this.characters[characterName].setPosition(stateInfo["P"][0] * this.sizeOffset, (this.mapData[0].length - stateInfo["P"][1]) * this.sizeOffset)
            }
        }

        this.lblTime.getComponent(Label).string = "Time: " + stateInfo["T"]
    }

    createCharacterNode(pos, name, state){
        // var characterName = stateInfo["N"]
        const node = instantiate(this.characterGrid)
        node.setPosition(pos[0] * this.sizeOffset, (this.mapData[0].length - pos[1]) * this.sizeOffset)
        var nodeColor
        if (name[0] == "a") {
            nodeColor = Color.RED
        } else if (name[0] == "s") {
            nodeColor = new Color(44, 127, 184) //Color.BLUE
        } else {
            nodeColor = new Color(49, 163, 84, 255) //Color.GREEN
        }
        if (state == "DIED") {
            nodeColor = Color.GRAY
        }
        node.getComponent(Sprite).color = nodeColor
        var lblName = node.getChildByName("lblName")
        lblName.getComponent(Label).string = name
        this.node.addChild(node)
        this.characters[name] = node
    }

}

