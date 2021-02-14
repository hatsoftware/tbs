function dispSetting(){
  var h_candi=window.innerHeight-(50+85);
  var dtl=
  '<div style="width:100%;height:100%;padding:0px;color:white;background:none;">'+
    '<div style="width:100%;height:50px;border:1px solid gray;">'+
      '<div style="float:right;width:auto;height:100%;padding:5px 0 0 0;background:none;">'+
        '<div style="float:left;width:auto;padding:10px;">Filter:</div><img src="gfx/filter.png" style="float:left;height:100%;"/>'+
      '</div>'+
    '</div>'+
    '<div style="width:100%;height:'+h_candi+'px;overflow:auto;padding:0px;background:none;">'+   
      '<div class="cls_ds_main" style="padding:0px;border:1px solid lightgray;padding:50px;background:none;">'+ 
        '<input type="button" onclick="reset_votes()" value="Reset Votes Only" />'+        
      '</div>'+
    '</div>'+
  '</div>';

  document.getElementById("div_main_right").innerHTML=dtl; 
}

function reset_votes(){
  MSG_SHOW(vbYesNo,"CONFIRM:","Are you sure to RESET VOTES now?",
    function(){

      axios.post(JBE_API+'z_reset.php', { clientno:CURR_CLIENT, request:3 },JBE_HEADER)
      .then(function (response) {    
        DB_CANDIDATE = response.data[0];    
        DB_TRAN_VOTES = response.data[1];    
        alert('get_db_candidate '+DB_CANDIDATE.length+' vs '+DB_TRAN_VOTES.length);
        snackBar('Votes Resetted Successfully');
        get_db_candidate();
      })    
      .catch(function (error) { console.log(error); allow_start(true); });

    },function(){}
  );
}
