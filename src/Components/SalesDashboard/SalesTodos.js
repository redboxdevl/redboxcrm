import React , {useState} from 'react';
import TodayTodos from './TodosHome/TodayTodos';
import OverduesTodos from './TodosHome/OverduesTodos';
import $ from 'jquery';

function SalesTodos({TodosData}) {

  const [TodosAct,setTodosAct] = useState('');
  $(document).on('click','.todoList',function(){
    var TodosL = $(this).attr("datatext");
    setTodosAct(TodosL);
  });


  return (
    <>
      
<div className="card">
<div className="card-header card-header-action">
<h6>To Do List / Reminders</h6>
<div className="d-flex align-items-center card-action-wrap">
<button type="button" className={TodosAct === 'overdues' ? ('btn btn-danger btn-sm mr-10 todoList active') : ('btn btn-danger btn-sm mr-10 todoList') } datatext="overdues">Expired</button>
<button type="button" className={TodosAct === 'today' ? ('btn btn-outline-primary btn-sm mr-10 todoList active') : ('btn btn-outline-primary btn-sm mr-10 todoList') } datatext="today">24 Hours</button>
<button type="button" className={TodosAct === 'weekly' ? ('btn btn-outline-primary btn-sm mr-10 todoList active') : ('btn btn-outline-primary btn-sm mr-10 todoList') } datatext="weekly">7 Days</button>
<button type="button" className={TodosAct === 'all' ? ('btn btn-outline-primary btn-sm mr-10 todoList active') : ('btn btn-outline-primary btn-sm mr-10 todoList') } datatext="all">Total</button>
</div>
</div>
<div className="card-body" style={{height:285,overflowX:'auto'}}>
{ TodosAct === 'overdues' ? (<OverduesTodos />) : (<TodayTodos dataTodos={TodosData} />) }
</div>

</div>

    </>
  )
}

export default SalesTodos