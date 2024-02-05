import { _decorator, AssetManager, resources, TextAsset } from 'cc';
const { ccclass, property } = _decorator;

// @ccclass("StatesData")
export namespace StatesData {
    var statesLog = []
    var readIdx = 0
    var isPause = false

    function initData(){
        resources.load("./StatesLog", (err, res:TextAsset) => {
            statesLog = res.text.split('\n')
            
        })
    }

    export function getStatesLog() {
        if (statesLog.length == 0) {
            initData()
        }
        return statesLog
    }

    export function getReadIdx() {
        return readIdx
    }

    export function getDataByIdx(idx?) {
        if (statesLog.length == 0) {
            initData()
        }
        if (idx) {
            if (idx < statesLog.length) {
                return JSON.parse(statesLog[idx])
            } else {
                console.log('state idx is not valid')
                return false
            }
        } else {
            return JSON.parse(statesLog[readIdx])
        }
    }

    export function setReadIdx(idx) {
        readIdx = idx
    }

    export function idxIncrement(){
        if (readIdx < statesLog.length) {
            readIdx++
        } else {
            return false
        }
    }

    export function getPauseStatus(){
        return isPause
    }

    export function setPauseStatus(status){
        isPause = status
    }
}

