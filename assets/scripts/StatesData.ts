import { _decorator, AssetManager, resources, TextAsset } from 'cc';
const { ccclass, property } = _decorator;

// @ccclass("StatesData")
export namespace StatesData {
    var statesLog = []
    var readIdx = 0
    var isPause = false
    var time = 0

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
                var currentData = JSON.parse(statesLog[idx])
                // time = currentData["Time"]
                return currentData
            } else {
                console.log('state idx is not valid')
                return false
            }
        } else {
            var currentData = JSON.parse(statesLog[readIdx])
            // time = currentData["Time"]
            return currentData
        }
    }

    export function setReadIdx(idx) {
        readIdx = idx
    }

    export function idxIncrement(){
        if (readIdx < statesLog.length) {
            readIdx++
        } else {
            return readIdx
        }
    }

    export function idxDecrement(){
        if (readIdx == 0) {
            return readIdx
        } else {
            readIdx--
        }
    }

    export function getPauseStatus(){
        return isPause
    }

    export function setPauseStatus(status){
        isPause = status
    }

    export function getTime(){
        return time
    }
}

