import { _decorator, Component, Node, Size, Prefab, instantiate, Label, Color, Widget } from 'cc';
const {ccclass, property} = _decorator;
import { StatesData } from './StatesData';

@ccclass
export default class LogTableItem extends Component {
    @property(Node)
    private bg: Node = null;

    @property(Label)
    private lblIndex: Label = null;

    @property(Label)
    private lblTime: Label = null;

    @property(Label)
    private lblEvents: Label = null;

    public refreshItem (idx, eventData) {
        var parsedData = JSON.parse(eventData)
        this.lblIndex.string = "No." + idx.toString();
        this.lblTime.string = "Time:" + parsedData["T"]
        this.lblEvents.string = parsedData["N1"] + " " + parsedData["L"] + " " + parsedData["N2"]
        this.bg.getComponent(Widget).updateAlignment();
    }
}