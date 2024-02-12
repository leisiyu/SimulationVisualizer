import { _decorator, Component, Node, Size, Prefab, instantiate, Label, Color, Widget } from 'cc';
const {ccclass, property} = _decorator;

@ccclass
export default class LogTableItem extends Component {
    @property(Node)
    private bg: Node = null;

    @property(Label)
    private label: Label = null;

    public refreshItem (value: number) {
        this.label.string = value.toString();
        // this.bg.color = Color(255 * Math.random(), 255 * Math.random(), 255 * Math.random());
        this.bg.getComponent(Widget).updateAlignment();
    }
}