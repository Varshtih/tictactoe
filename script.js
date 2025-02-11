const cells=document.querySelectorAll('.size')
const rb=document.querySelector('.resbut')
const currentstatus=document.querySelector('.status')

const wi=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let options=["","","","","","","","",""];
let current='X';
let running=false;

init();
function init()
{
    cells.forEach(cell=>cell.addEventListener('click',cellclicked));
    rb.addEventListener('click',restart);
    currentstatus.innerHTML=`${current}'s turn`;
    running=true;
}
function cellclicked()
{
    const i=this.getAttribute("index");
    if(options[i]!="" || !running)
    {
        return;
    }
    update(this,i);
    check();    
}
function update(cell,index)
{
    options[index]=current;
    cell.innerHTML=current;
}
function change()
{
    current=(current=='X') ? 'O':'X';
    currentstatus.innerHTML=`${current}'s turn`;
}
function check()
{
    let won=false;
    for (let i = 0; i < wi.length; i++) {
        let c=wi[i];
        const c1=options[c[0]];
        const c2=options[c[1]];
        const c3=options[c[2]];
        if(c1=='' || c2=='' || c3=='')
        {
            continue;
        }
        else if(c1==c2 && c2==c3)
        {
            won=true;
            break;
        }
    }
    if(won)
    {
        currentstatus.innerHTML=`${current} won`;
    }
    else if(!options.includes(""))
    {
        currentstatus.innerHTML=`its' a tie`;
    }
    else
    {
        change();
    }
}
function restart()
{
    current='X';
    options=["","","","","","","","",""];
    currentstatus.innerHTML=`${current}'s turn`;
    cells.forEach(cell=>cell.innerHTML="");
    running=true; 
}
