import { _decorator, Component, Node, Size, Prefab, instantiate } from 'cc';
import TableView, {TableViewCellNode} from "./UITableView";
import LogTableItem from './LogTableItem';
const { ccclass, property } = _decorator;

@ccclass('LogTableView')
export class LogTableView extends Component {

    tableData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    @property({type: TableView})
    tableView: TableView = null;

    @property(Prefab)
    private itemPrefab: Prefab = null;

    start() {
        this.tableView.reloadData();
    }

    tableCellCount(): number {
        return this.tableData.length;
    }

    tableCellSize(idx: number): Size {
        return new Size(310, 100);// 通过idx可为每个cell设置单独size
    }

    tableCellUpdate(idx: number, cell: TableViewCellNode) {
        console.log("idx = " + idx, "data = " + this.tableData[idx]);
        let item = cell.getChildByName("item")
        if (!item) {
            item = instantiate(this.itemPrefab);
            item.parent = cell;
            item.name = "item";
        }
        item.getComponent(LogTableItem).refreshItem(this.tableData[idx]);
    }


    update(deltaTime: number) {
        
    }
}

