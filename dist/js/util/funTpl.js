export default function(){
    return function(func){
        return func.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '')
    }
}