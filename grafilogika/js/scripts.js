document.addEventListener('DOMContentLoaded', main);

let szin=['feher', 'fekete', 'szurke'];
let matrixba=['','X','.'];

let kep = `..X..
.X.X.
X...X
XXXXX
X...X
XXXXX`;

let allapotmatrix = [];
let matrix = [];

function main(){

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
    let [table, am] = tablarajzolas(matrix);
    allapotmatrix = am;
    body.appendChild(table);

    //  

    console.log('ez az állapotmátrix a {0,1,2} fölött:')
    console.log(allapotmatrix);


}



function mezokattintaskor(event){ 
    let element = event.target;
    let [x,y] = element.id.split('m');
    allapotmatrix[x][y] = (allapotmatrix[x][y]+1)%3;
    element.setAttribute('class', szin[allapotmatrix[x][y]]); 
    console.log(allapotmatrix);

    if (vegevane()){alert('sikerült!');}

}


function vegevane(){
    let i = 0;
    let j = 0;
    while (i<matrix.length && matrixba[allapotmatrix[i][j]]===matrix[i][j]) {
        if (++j===matrix[0].length) {
            j = 0;
            ++i;
        }    
    }
    return i===matrix.length;
}

function kepbolMatrix(kep){ return kep.split('\n').map(s => s.split('')); }

function mat2tbl(matrix){
    let table = document.createElement('table');
    table.setAttribute('id','tabla');
    let allapota = {};
    let allapotmatrix = [];

    for (let i = 0; i < matrix.length; i++) {
        const sor = matrix[i];
        let tr = document.createElement('tr');
        let allapotsor = [];
        for (let j = 0; j < sor.length; j++) {
            const elem = sor[j];
            let td = document.createElement('td');
            //td.classList.add(elem == 'X' ? "fekete" : "szurke");
            tr.appendChild(td);
            td.addEventListener('click', mezokattintaskor);
            td.classList.add('feher');
            td.setAttribute('id',i+'m'+j);
            allapotsor.push(0);
            //td.innerHTML=elem;
        }    
        allapotmatrix.push(allapotsor);
        table.appendChild(tr);
    }
    return [table, allapotmatrix];
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
    let [tbl, allapotmatrix] = mat2tbl(matrix);
    td.appendChild(tbl);

    
    return [table, allapotmatrix];
}
