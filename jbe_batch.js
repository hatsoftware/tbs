function disp_batch(f_batch,pos,vcode){ 
  var m=document.getElementById("myView1").getAttribute('data-JBEpage'); 
  var v_area='brgy';
  document.getElementById('BOARD_MAIN').setAttribute('data-pos',pos);
  document.getElementById('BOARD_MAIN').setAttribute('data-batch',f_batch);

  var tilt='Barangay';
  var h_dtl_view=H_VIEW_DTL-60;
  if(JBE_MOBILE){    
    h_dtl_view=H_VIEW_DTL-30;
    //document.getElementById('pmap').style.width='100%';
  }
  //document.getElementById('dv_dtl_view').style.height=h_dtl_view+'px';

  if(!f_batch){ 
    show_place_votes(vcode,v_area,CURR_CITYMUNCODE);
    return;
  }

  var dtl=
  '<div id="batch_main" data-sele="" data-pos="'+pos+'" data-candi_no="" data-toplevel="" style="width:100%;height:100%;text-align:left;padding:0px;background:white;">'+
    
    '<div onclick="" style="width:100%;height:60px;border:1px solid black;color:white;background:'+JBE_CLOR+';">'+ //head
      show_header(pos,v_area)+
    '</div>'+
  
    '<div id="batch_dtl" style="border:1px solid black;width:100%;height:'+h_dtl_view+'px;">'+    
      '<div id="bat_candi_dtl" style="float:left;width:50%;height:100%;padding:10px;overflow:auto;background:none;">'+
      '</div>'+  
      '<div id="bat_places_'+v_area+'" style="float:left;width:50%;height:100%;font-size:12px;overflow:auto;padding:10px;background:none;">'+
      '</div>'+  
    '</div>'+  

  '</div>';

  JBE_OPEN_VIEW(dtl,tilt,'close_disp_batch');
  document.getElementById('subtilt_'+m+v_area).innerHTML='City/Municipal: '+JBE_GETFLD('citymunDesc',ref_city,'citymunCode',CURR_CITYMUNCODE);
  modal_ON(true);  
  

  dtl='';  
  var aryCandidate=DB_CANDIDATE;

  //alert(f_batch+' vs '+vcode);
  for(var i=0;i<aryCandidate.length;i++){  
    var vpos=aryCandidate[i]["pos"];          
    if(pos != vpos){ continue; }      
    
    var candi_no=aryCandidate[i]['code'];    

    if(!f_batch){
      //alert('not batch');
      if(candi_no != vcode){ continue; }
    }
    
    //alert(vpos+' name:'+vcandi_name);
    dtl+=
    '<div style="width:100%;height:65px;margin-top:5px;background:none;padding:0px;">'+
    
      '<div class="cls_shadow_dispboard" style="position:relative;width:100%;border:0px solid black;cursor:pointer;">'+
        '<div class="cls_shadow_box1"></div>'+
        '<div class="cls_shadow_box2">'+
          
          '<div id="candi_board_'+candi_no+'" onclick="sele('+candi_no+')" class="cls_dispboard">'+
            
            '<div class="cls_dispboard_img">'+
              '<img id="candi_img_'+i+'" class="cls_dispboard_img_in" src="'+JBE_API+'upload/photo/'+candi_no+'.jpg" />'+              
            '</div>'+
            '<div class="cls_dispboard_candi">'+
            
              '<div id="candi_name_'+i+'" class="cls_dispboard_candi_1">'+
                aryCandidate[i]['name']+
              '</div>'+
              '<div id="candi_party_'+i+'" class="cls_dispboard_candi_2">'+                
                JBE_GETFLD('partyname',DB_PARTYMAST,'partyno',aryCandidate[i]['partyno'])+
              '</div>'+
              '<div id="candi_pos_'+i+'" class="cls_dispboard_candi_3">'+
                JBE_STORE_CANDIDATE[parseInt(vpos)-1]['posname']+
              '</div>'+
            
            '</div>'+
            '<div id="candi_votes_'+i+'" class="cls_dispboard_votes">'+
              jformatNumber(aryCandidate[i]['votes'])+
            '</div>'+
          '</div>'+

        '</div>'+              
      '</div>'+

    '</div>';       
  }    

  document.getElementById('bat_candi_dtl').innerHTML=dtl;//'zzzxxx'; //show_area('brgy',CURR_CITYMUNCODE);
  if(f_batch){
    show_area('bat_places_'+v_area,'brgy','',CURR_CITYMUNCODE);
  }else{        
    //show_area('bat_places_'+v_area,'brgy',vcode,CURR_CITYMUNCODE);
    sele(vcode);    
  }  
}

function close_disp_batch(){
  showMainPage();
  return;
}

function show_area(v_div,v_area,candi_no,v_filter){  
  var v_pos=document.getElementById('BOARD_MAIN').getAttribute('data-pos');
  //alert(v_pos);
  var candi_no=document.getElementById('BOARD_MAIN').getAttribute('data-candi_no');  
  //alert('show_area: '+v_area+' v_filter '+v_filter);
  //alert('v_filter '+v_filter);
  var db=[];
  var code; 
  var desc;
  var aryTop_fld=["citymunCode","brgyCode"];
  var top_fld;
  var vfunc;  
  var pram;

  if(v_area=='brgy'){ 
    db=ref_brgy; 
    code='brgyCode';
    desc='brgyDesc';
    top_fld='citymunCode';
    //top_fld=aryTop_fld[0];
        
    vfunc='show2_cluster';    
    pram='cluster';
  }else if(v_area=='cluster'){ 
    db=DB_CLUSTER; 
    //alert('YESSS '+db.length);
    code='clusterno';
    desc='clustername';
    top_fld='brgyCode';
    //top_fld=aryTop_fld[1];
    vfunc='show_none';    
    pram='';
  }

  var aryPlace=[];
  var ctr=0;
  var dtl='';

  for(var i=0;i<db.length;i++){    
    if(db[i][top_fld] != v_filter){ continue; }

    var vcode=db[i][code];
    var vdesc=db[i][desc];
    var votes=0;
    //alert(vcode);
    for(var k=0;k<DB_TRAN_VOTES.length;k++){      
      if(DB_TRAN_VOTES[k][code] != vcode){ continue; }
      if(DB_TRAN_VOTES[k]['pos'] != v_pos){ continue; }
      if(candi_no){
        if(DB_TRAN_VOTES[k]['candi_no'] != candi_no){ continue; }
      }

      votes+=parseInt(DB_TRAN_VOTES[k]['votes']);      
    }
    //alert('new votes:'+votes);
    let ob={
      "code":vcode,
      "name":vdesc,
      "votes":votes
    }
    aryPlace[ctr]=ob;
    ctr++;
  }

  //==================sort votes =============================================  
  var aryName=[];
  var aryVotes=[];
  var aryNew=aryPlace;
  aryNew.sort(sortByMultipleKey(['*votes',vcode]));
  for(var i=0;i<aryNew.length;i++){
    //alert(aryNew[i]['name']+' : '+aryNew[i]['votes']);
    //var xcode=aryNew[i]['code'];
    var xname=aryNew[i]['name'];
    var xvotes=aryNew[i]['votes'];
    dtl+=
    '<div class="cls_votes_dtl" style="cursor:auto;background:none;">'+          
      '<div>'+xname+'</div>'+
      '<span id="dv_votes_'+i+'">'+        
        jformatNumber(xvotes)+
      '</span>'+
      
    '</div>';
    //aryName[i]=xname;
    //aryVotes[i]=xvotes;
    //tot_votes+=xvotes;
  }    
  
  document.getElementById(v_div).innerHTML=dtl;
}

function clear_func(){
  var osele=document.getElementById('batch_main').getAttribute('data-sele');  
  if(osele){ document.getElementById('candi_board_'+osele).style.border='0px solid black'; }
  var pos=document.getElementById('batch_main').getAttribute('data-pos');  
  document.getElementById('batch_main').setAttribute('data-candi_no','');  
  show_area('bat_places','brgy','',CURR_CITYMUNCODE);
}

function sele(candi_no){
  var place='brgy';
  var top_fld=CURR_CITYMUNCODE;
  var osele=document.getElementById('batch_main').getAttribute('data-sele');  
  if(osele){ document.getElementById('candi_board_'+osele).style.border='0px solid black'; }
  document.getElementById('candi_board_'+candi_no).style.border='1px solid black';
  document.getElementById('batch_main').setAttribute('data-sele',candi_no);  
  document.getElementById('batch_main').setAttribute('data-candi_no',candi_no);  
  //put_the_votes(candi_no);  
  show_place_votes(candi_no,place,top_fld);
}

function get2PlaceVotes(candi_no,place_type,place_no){  
  var vcode;    
  
  if(place_type=='reg'){
    vcode='regCode';
  }else if(place_type=='prov'){
    vcode='provCode';
  }else if(place_type=='district'){
    vcode='citymunCode'; 
  }else if(place_type=='citymun'){
    vcode='citymunCode';
  }else if(place_type=='brgy'){
    vcode='brgyCode';
  }else if(place_type=='cluster'){
    vcode='clusterno';  
  }

  //alert('candi_no: '+candi_no+'\n vcode: '+vcode+'\n place_no: '+place_no);

  var rvotes=0;

  for(var i=0;i<DB_TRAN_VOTES.length;i++){
    //if(DB_TRAN_VOTES[i]['candi_no'] != candi_no){ continue; }
    if(candi_no){
      if(DB_TRAN_VOTES[i]['candi_no'] != candi_no){ continue; }
    }
    if(DB_TRAN_VOTES[i][vcode] != place_no){ continue; }    

    rvotes+=parseInt(DB_TRAN_VOTES[i]['votes']);  
  }
  return rvotes;
}


function show2_citymun(candi_no,vCode){
  show_place_votes(candi_no,'citymun',vCode);
}
function show2_brgy(candi_no,vCode){
  show_place_votes(candi_no,'brgy',vCode);
}
function show2_cluster(candi_no,vCode){  
  show_place_votes(candi_no,'cluster',vCode);
}



function show_place_votes(candi_no,place_type,place_no){
  var m=document.getElementById("myView1").getAttribute('data-JBEpage'); 
  var aryDB=JBE_GETARRY(DB_CANDIDATE,'code',candi_no);
  var pos=aryDB['pos'];  
  /*
  alert(
    'show_place_votes'+    
    '\ncandi_no: '+candi_no+
    '\nplace_type: '+place_type+
    '\nplace_no: '+place_no
  );
  */
  var dtl=
  '<div style="width:100%;height:'+(H_VIEW_DTL-60)+'px;">'+

    '<div style="width:100%;height:60px;border:1px solid black;color:white;background:'+JBE_CLOR+';">'+ //head
      show_header(pos,place_type)+
    '</div>'+

    '<div style="width:100%;height:100%;background:white;">'+ //body

      '<div id="bat_candi_dtl_'+place_type+'" style="float:left;width:50%;height:100%;padding:10px;overflow:auto;background:none;">'+ //left
        
        '<div class="cls_dispboard" style="height:60px;">'+            
          '<div class="cls_dispboard_img">'+
            '<img id="candi_img_" class="cls_dispboard_img_in" src="'+JBE_API+'upload/photo/'+candi_no+'.jpg" />'+              
          '</div>'+
          '<div class="cls_dispboard_candi">'+
          
            '<div id="candi_name_" class="cls_dispboard_candi_1">'+
              aryDB['name']+
            '</div>'+
            '<div id="candi_party_" class="cls_dispboard_candi_2">'+                
              JBE_GETFLD('partyname',DB_PARTYMAST,'partyno',aryDB['partyno'])+
            '</div>'+
            '<div id="candi_pos_" class="cls_dispboard_candi_3">'+
              //JBE_STORE_CANDIDATE[parseInt(pos)-1]['posname']+
            '</div>'+
          
          '</div>'+
          '<div id="new_votes_'+place_type+'" class="cls_dispboard_votes">'+
            jformatNumber(aryDB['votes'])+
          '</div>'+
        '</div>'+

      '</div>'+  // end left
    
      '<div id="new_place_'+place_type+'" style="float:left;width:50%;height:100%;font-size:12px;overflow:auto;padding:10px;background:none;">'+ // right        
      '</div>'+  // end right

    '</div>'+  

  '</div>';

  JBE_OPEN_VIEW(dtl,place_type.toUpperCase(),'close_new|'+place_type);
    
  var vcode='';
  var vdesc='';
  var vplace_no='';
  var grap_no=0;
  var vfunc;
  var aryPlace=[];
  var vndx=0;

  var aryFLD=[
    { "place_type":"reg", "vtitle":"Region", "vcode":"regCode", "vdesc":"regDesc", "aryPlace":ref_reg, "vplace_no":"", "vfunc":"show2_province" },
    { "place_type":"prov", "vtitle":"Province", "vcode":"provCode", "vdesc":"provDesc", "aryPlace":ref_prov, "vplace_no":"regCode", "vfunc":"show2_citymun" },
    { "place_type":"district", "vtitle":"District "+CURR_SCOPE_NO, "vcode":"citymunCode", "vdesc":"provDesc", "aryPlace":DB_DISTRICT, "vplace_no":"regCode", "vfunc":"show2_citymun" },
    { "place_type":"citymun", "vtitle":"Municipal/City", "vcode":"citymunCode", "vdesc":"citymunDesc", "aryPlace":ref_city, "vplace_no":"provCode", "vfunc":"show2_brgy" },
    { "place_type":"brgy", "vtitle":"Barangay", "vcode":"brgyCode", "vdesc":"brgyDesc", "aryPlace":ref_brgy, "vplace_no":"citymunCode", "vfunc":"show2_cluster" },
    { "place_type":"cluster", "vtitle":"Cluster", "vcode":"clusterno", "vdesc":"clustername", "aryPlace":DB_CLUSTER, "vplace_no":"brgyCode", "vfunc":"show_none" }
  ]

  //alert(aryFLD[1]["vtitle"]);

  if(place_type=='reg'){
    vtitle='Region';
    vcode='regCode';
    vdesc='regDesc';    
    aryPlace=ref_reg;
    vplace_no='';
    grap_no=1;
    vfunc='show2_province';    
    vndx=0;
  }else if(place_type=='prov'){
    vtitle='Province';
    vcode='provCode';
    vdesc='provDesc';
    aryPlace=ref_prov;
    vplace_no='regCode';
    grap_no=2;
    vfunc='show2_citymun';
    vndx=1;
  }else if(place_type=='district'){
    aryPlace=[];
    var ctr=0;
    for(var i=0;i<ref_city.length;i++){
      if(ref_city[i]['disCode'] != CURR_SCOPE_NO){ continue; }
      
      let ob={       
        "disCode":ref_city[i]['disCode'],
        "citymunCode":ref_city[i]['citymunCode'],
        "citymunDesc":ref_city[i]['citymunDesc'], 
        "provCode":ref_city[i]['provCode'],
        "regCode":ref_city[i]['regCode']
      };
      aryPlace[ctr]=ob;
      ctr++;
    }
    //alert(aryPlace.length);
    vtitle='District '+CURR_SCOPE_NO;
    vcode='citymunCode';
    vdesc='citymunDesc';
    //aryPlace=ref_district;
    vplace_no='disCode';
    grap_no=3;
    vfunc='show2_brgy';
    vndx=2;
  }else if(place_type=='citymun'){
    vtitle='Municipal/City';
    vcode='citymunCode';
    vdesc='citymunDesc';
    aryPlace=ref_city;
    vplace_no='provCode';
    grap_no=3;
    vfunc='show2_brgy';
    vndx=3;
  }else if(place_type=='brgy'){
    vtitle='Barangay';
    vcode='brgyCode';
    vdesc='brgyDesc';
    aryPlace=ref_brgy;
    vplace_no='citymunCode';
    grap_no=4;
    vfunc='show2_cluster';   
    vndx=4;   
  }else if(place_type=='cluster'){
    vtitle='Cluster';
    vcode='clusterno';
    vdesc='clustername';
    aryPlace=DB_CLUSTER;
    vplace_no='brgyCode';
    grap_no=5;
    vfunc='show_none';   
    vndx=5; 
  }

  vtitle=aryFLD[vndx]['vtitle'];
  vcode=aryFLD[vndx]['vcode'];
  vdesc=aryFLD[vndx]['vdesc'];
  aryPlace=aryFLD[vndx]['aryPlace'];
  vplace_no=aryFLD[vndx]['vplace_no'];
  vfunc=aryFLD[vndx]['vfunc'];

  var tname=JBE_GETFLD(aryFLD[vndx-1]['vdesc'],aryFLD[vndx-1]['aryPlace'],vplace_no,place_no);
  //alert(tname);
  document.getElementById('subtilt_'+m+place_type).innerHTML=aryFLD[vndx-1]['vtitle']+': '+tname;//+': '+JBE_GETFLD(vdesc,aryPlace,vplace_no,place_no);

  var vcandi_pos=parseInt(JBE_GETFLD('pos',DB_CANDIDATE,'code',candi_no));
  //alert(vcandi_pos);

  var dtl='';  
  var aryNewPlace=[];
  var ctr=0;

  //alert('place_no '+place_no);
  //alert('place_type '+place_type);
  //alert('vplace_no '+vplace_no);

  for(var i=0;i<aryPlace.length;i++){
    if(place_type != 'reg'){
      if(aryPlace[i][vplace_no] != place_no){ continue; }
    }
    
    if((vcandi_pos > 3 && vcandi_pos < 7) && aryPlace[i]['provCode']==place_no && parseInt(aryPlace[i]['ic'])==1){ continue; }
                  
    var vvcode=aryPlace[i][vcode];  

    var votes=0;
    //votes=get2PlaceVotes(candi_no,place_type,vvcode);

    //===============================================================    
    for(var ik=0;ik<DB_TRAN_VOTES.length;ik++){
      //if(DB_TRAN_VOTES[i]['candi_no'] != candi_no){ continue; }
      if(candi_no){
        if(DB_TRAN_VOTES[ik]['candi_no'] != candi_no){ continue; }
      }
      if(DB_TRAN_VOTES[ik][vcode] != vvcode){ continue; }    

      votes+=parseInt(DB_TRAN_VOTES[ik]['votes']);  
    }
    //===============================================================

    let ob={
      "code":aryPlace[i][vcode],
      "name":aryPlace[i][vdesc],
      "votes":votes
    }
    aryNewPlace[ctr]=ob;
    ctr++;
  }

  //alert(aryNewPlace.length);

//===============================================================
//===============================================================
  var tot_votes=0;
  var aryName=[];
  var aryVotes=[];
  var aryNew=aryNewPlace;
  aryNew.sort(sortByMultipleKey(['*votes',vdesc]));
  for(var i=0;i<aryNew.length;i++){
    //alert(aryNew[i]['name']+' : '+aryNew[i]['votes']);
    var xcode=aryNew[i]['code'];
    var xname=aryNew[i]['name'];
    var xvotes=aryNew[i]['votes'];
    dtl+=
    '<div class="cls_votes_dtl" onclick="'+vfunc+'(&quot;'+candi_no+'&quot;,&quot;'+xcode+'&quot;)">'+          
      '<div>'+xname+'</div>'+
      '<span id="dv_votes_'+i+'">'+        
        jformatNumber(xvotes)+
      '</span>'+      
    '</div>';
    aryName[i]=xname;
    aryVotes[i]=xvotes;
    tot_votes+=xvotes;
  }    
  
  document.getElementById("new_place_"+place_type).innerHTML=dtl;  
  document.getElementById("new_votes_"+place_type).innerHTML=jformatNumber(tot_votes);
  //return dtl;
}
function close_new(v){  
  var f_batch=document.getElementById("BOARD_MAIN").getAttribute('data-batch');
  if(v=='brgy' && f_batch==0){ 
    showMainPage(); 
  }
}


