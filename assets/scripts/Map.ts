import { _decorator, AssetManager, resources, TextAsset, Component, Node, Prefab, SpriteFrame, instantiate, Sprite, Color, Button, Label } from 'cc';
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

        // action: move
        if (stateInfo["A"] == "m" ) {
            var characterName = stateInfo["N"]
            if (this.characters[characterName] == null) {
                const node = instantiate(this.character)
                node.setPosition(stateInfo["P"][0] * 10, stateInfo["P"][1] * 10)
                var nodeColor
                if (characterName[0] == "a") {
                    nodeColor = Color.RED
                } else if (characterName[0] == "s") {
                    nodeColor = Color.BLUE
                } else {
                    nodeColor = Color.GREEN
                }
                node.getComponent(Sprite).color = nodeColor
                var lblName = node.getChildByName("lblName")
                lblName.getComponent(Label).string = characterName
                this.node.addChild(node)
                this.characters[characterName] = node
            } else {
                this.characters[characterName].setPosition(stateInfo["P"][0] * 10, stateInfo["P"][1] * 10)
            }
        }

        this.lblTime.getComponent(Label).string = "Time: " + stateInfo["T"]
    }

}

