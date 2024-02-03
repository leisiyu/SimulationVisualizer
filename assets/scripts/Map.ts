import { _decorator, AssetManager, resources, TextAsset, Component, Node, Prefab, SpriteFrame, instantiate, Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Map')
export class Map extends Component {
    @property(Prefab)
    // mapGridRoad: Prefab = null
    mapGrid: Prefab = null
    character: Prefab = null

    mapData = []
    mapSize = []

    start() {
        resources.load("./CityMap", (err, res:TextAsset) => {
            // console.info(res.text)
            this.mapData = JSON.parse(res.text)
            // console.info(this.mapData.length)
            this.mapSize = [this.mapData.length, this.mapData[0].length]
            console.info(this.mapSize)

            for (let i = 0; i < this.mapData.length; i++) {
                for (let j = 0; j < this.mapData[0].length; j++) {            
                    
                        const node = instantiate(this.mapGrid)
                        node.setPosition(30 + (i - 1) * 10, (this.mapData[0].length - j) * 10)
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
        // console.info("??????")
        if (deltaTime / 10 == 0) {

        }
    }

    // loadImages(){
    //     resources.load(
    //         "blank",
    //         SpriteFrame,
    //         (_err, spriteFrames) => {
    //           this.mapGridImage = spriteFrames;
    //         }
    //       );
    // }
}

