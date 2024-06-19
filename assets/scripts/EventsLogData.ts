import { _decorator, resources, TextAsset } from 'cc';
const { ccclass, property } = _decorator;

// @ccclass("EventsLogData")
export namespace EventsLogData {
    var eventsLog = []
    var highLevelLog = []
    var lowLevelLogOfOneHighLevelEvent = []
    var isLowLevenLogUpdated = false

    export function initData(){
        resources.load("./EventsLog", (err, res:TextAsset) => {
            eventsLog = res.text.split('\n')
            for (let i = 0; i < eventsLog.length; i++){
                var currentLog = JSON.parse(eventsLog[i])
                if (currentLog["type"] != undefined){
                    if (currentLog["type"] == "high-level" || currentLog["type"] == "story") {
                        highLevelLog.push(currentLog)
                    }
                    
                }
            }
        })
    } 

    export function getEventsLog(){
        if (eventsLog.length == 0) {
            initData()
        }
        return eventsLog
    }

    export function getHighLevelLog(){
        if (eventsLog.length == 0) {
            initData()
        }

        return highLevelLog
    }

    export function getEventsByHighLevelID(id){
        var lowLevelEventsId = []
        for (let i = 0; i < highLevelLog.length; i++){
            if (id == highLevelLog[i]["id"]) {
                lowLevelEventsId = highLevelLog[i]["ids"]
                break
            }
        }

        var lowLevelEvents = []
        for (let i = 0; i < lowLevelEventsId.length; i++){
            var currentId = lowLevelEventsId[i]
            for (let j = 0; j < eventsLog.length; j++){
                var currentEvent = JSON.parse(eventsLog[j])
                if (currentEvent["id"] == currentId){
                    lowLevelEvents.push(currentEvent)
                    break
                }
            }
        }
        return lowLevelEvents
    }

    export function updateLowLevelData(highLevelId){
        lowLevelLogOfOneHighLevelEvent = getEventsByHighLevelID(highLevelId)
        isLowLevenLogUpdated = true

        return lowLevelLogOfOneHighLevelEvent
    }

    export function getLowLevelData(){
        isLowLevenLogUpdated = false
        return lowLevelLogOfOneHighLevelEvent
    }

    export function checkIfLowLevelLogUpdated(){
        return isLowLevenLogUpdated
    }

}