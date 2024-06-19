import { _decorator, Component, Node, Size, Prefab, instantiate, Label, Color, Widget, Button } from 'cc';
const {ccclass, property} = _decorator;
import { StatesData } from './StatesData';
import TableView from './UITableView';
import { EventsLogData } from './EventsLogData';
// import { LowLevelTableView } from './LowLevelTableView';

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

    @property(Button)
    private btnShow: Button = null;

    private parsedData = null

    public refreshItem (idx, eventData) {
        this.parsedData = eventData
        this.lblIndex.string = "No." + idx.toString();
        this.lblTime.string = "Time:" + this.parsedData["T"]
        this.lblEvents.string = this.parsedData["N1"] + " " + this.parsedData["L"] + " " + this.parsedData["N2"]
        this.btnShow.node.on(Button.EventType.CLICK, this.onBtnClicked, this);
        this.bg.getComponent(Widget).updateAlignment();
    }

    public onBtnClicked(button: Button){
        if (this.parsedData == null) {return}
        if (this.parsedData["ids"] == null) {return}

        EventsLogData.updateLowLevelData(this.parsedData["id"])
    }

}