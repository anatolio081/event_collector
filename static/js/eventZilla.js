function get_time(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = hour + ':' + min + ':' + sec ;
  return time;
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function showJSON(e) {
    json_id = e.dataset.id
    var a = document.getElementById("input").textContent
    var arr = a.split("@@@@")
    var content = document.getElementById("content")
    var container = document.getElementById("content-container")
    for (let i = 0; i < arr.length - 1; i++) {
        if (json_id == i) {

            var my_json = JSON.parse(arr[i]);
            myoutput = syntaxHighlight(JSON.stringify(my_json, undefined, 2));
            content.innerHTML = myoutput
        }
    }
}

function addElement(event_id, timestamp, id) {
    var newDiv = document.createElement("div")
    var time = get_time(timestamp)
    var newContent = document.createTextNode(event_id + " " + time);
    //формирую  аттрибут id
    var a = document.createAttribute("data-id");
    a.value = id;
    newDiv.setAttributeNode(a);

    //формирую  аттрибут event_id
    var a = document.createAttribute("data-event_id");
    a.value = event_id;
    newDiv.setAttributeNode(a);

    //формирую аттрибут таймстампа
    var a = document.createAttribute("data-timestamp");
    a.value = timestamp;
    newDiv.setAttributeNode(a);

    //формирую стиль
    var a = document.createAttribute("class");
    a.value = "gen_element";
    newDiv.setAttributeNode(a);

    //формирую метод онклик
    var a = document.createAttribute("onclick");
    a.value = "showJSON(this)";
    newDiv.setAttributeNode(a);

    newDiv.appendChild(newContent);
    var currentDiv = document.getElementById("menu");
    currentDiv.appendChild(newDiv)
}

function load_all() {
    var a = document.getElementById("input").textContent
    var arr = a.split("@@@@")
    var menu = document.getElementById("menu")
    for (let i = 0; i < arr.length - 1; i++) {
        var obj = JSON.parse(arr[i])
        var event_id = obj["events"][0]["event_id"]
        var timestamp = obj["events"][0]["timestamp"]
        addElement(event_id, timestamp, i)
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clear_menu() {
    let menu = document.getElementById('menu');
    var count = menu.childElementCount
    for (let i = 0; i < count; i++) {
        menu.removeChild(menu.lastElementChild)
    }
}


async function demo() {
    for (let i = 0; i < 5; i++) {
        console.log('Taking a break...');
        await sleep(5000);
        clear_menu()
        load_all()
    }
}