import { _decorator, resources, TextAsset } from 'cc';
const { ccclass, property } = _decorator;

// @ccclass("EventsLogData")
export namespace EventsLogData {
    var eventsLog = []

    export function initData(){
        resources.load("./EventsLog", (err, res:TextAsset) => {
            eventsLog = res.text.split('\n')
        })
    } 

    export function getEventsLog() {
        if (eventsLog.length == 0) {
            initData()
        }
        return eventsLog
    }
}