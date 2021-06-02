d = document;
d.addEventListener('DOMContentLoaded', main);



function main(){
    let kep = `..X..
.X.X.
X...X
XXXXX
X...X
XXXXX`;

    console.log('input:\n' + kep);
    matrix = kepbolMatrix(kep);
    console.log('matrix:\n')
    console.log(matrix);

    console.log('table:\n');
    console.log(mat2tbl(matrix));

    console.log('bal oldali blokkok:');
    console.log(baloldaliBlokkok(matrix));
    console.log('felso blokkok:');
    console.log(felsoBlokkok(matrix));

    console.log('Az egész:');
    console.log(tablarajzolas(matrix))

    body = document.getElementsByTagName('body')[0];
    body.appendChild(tablarajzolas(matrix));
}

function kepbolMatrix(kep){ return kep.split('\n').map(s => s.split('')); }

function mat2tbl(matrix){
    let table = d.createElement('table');
    table.setAttribute('id','tabla');

    for (const sor of matrix) {
        let tr = d.createElement('tr');
        for (const elem of sor) {
            let td = d.createElement('td');
            td.classList.add(elem == 'X' ? "fekete" : "szurke");
            tr.appendChild(td);
            //td.innerHTML=elem;
        }
        table.appendChild(tr);
    }

    return table;
}


function blokklista(s){
    let l = []; // szigethosszok sorozata
    let a = s[0]=='X' ? 1 : 0; // a mint aktuális szigethossz
    for (let i = 1; i < s.length; i++) {
        if (s[i]=='X'){
            a++;
        }
        else if (s[i-1]=='X') {
            l.push(a);
            a = 0;
        }
    }

    if (a != 0) {
        l.push(a);
    }

    return l;
}



function baloldaliBlokkok(matrix){ return matrix.map(blokklista); }
function felsoBlokkok(matrix){ return transzponal(matrix).map(blokklista); }

function baltabla(ll){
    let table = document.createElement('table');
    table.classList.add("baltabla")

    for (const l of ll) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        for (const e of l) {
            let td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML=e;
        }
    }
    return table;
}



function feltabla(ll){
    let table = document.createElement('table');
    table.classList.add("feltabla")

    let tr = document.createElement('tr');
    table.appendChild(tr);
    for (const l of ll) {
        let td = document.createElement('td');
        tr.appendChild(td);
        for (const e of l) {
            let div = document.createElement('div');
            div.classList.add('szam');  
            div.innerHTML = e;
            td.appendChild(div);
        }
    }
    return table;
}



function transzponal(matrix){
    t = []
    for (let j = 0; j < matrix[0].length; j++) {
        s = []
        for (let i = 0; i < matrix.length; i++) {            
            s.push(matrix[i][j]);
        }
        t.push(s);
    }
    return t;
}



function tablarajzolas(matrix)
{
    let table = document.createElement('table');
    table.setAttribute('id', 'elrendezes');
    
    let tr = document.createElement('tr');
    table.appendChild(tr);
    let td = document.createElement('td');
    tr.appendChild(td);
    
    td = document.createElement('td');
    tr.appendChild(td);
    
    td.appendChild(feltabla(felsoBlokkok(matrix)));
    tr.appendChild(td);
    
    tr = document.createElement('tr');
    table.appendChild(tr);
    
    td = document.createElement('td');
    tr.appendChild(td);
    td.appendChild(baltabla(baloldaliBlokkok(matrix)));
    
    td = document.createElement('td');
    tr.appendChild(td);
    td.appendChild(mat2tbl(matrix));
    
    return table;
}
