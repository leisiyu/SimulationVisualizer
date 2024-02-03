import { _decorator, AssetManager, resources, TextAsset } from 'cc';
const { ccclass, property } = _decorator;

// @ccclass("StatesData")
export namespace StatesData {
    var statesLog = []
    var readIdx = 0

    function initData(){
        resources.load("./StatesLog", (err, res:TextAsset) => {
            statesLog = JSON.parse(res.text)
            
        })
    }

    export function getStatesLog() {
        if (statesLog.length == 0) {
            initData()
        }
        return statesLog
    }

    export function getReadIdx() {

    }

    export function getDataByIdx() {

    }
}

