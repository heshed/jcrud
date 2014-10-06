jQuery(document).ready(function() {

  var rest_url = 'http://127.0.0.1:8000/resources/servers/';
  var add_options = {
      mtype: 'POST',
      closeAfterAdd: true,
  };

  var delete_button = function(id) {
    var option = "{ mtype:'DELETE', url:'" + rest_url + id + "/'}";
    console.log(option);
    return "<a class='btn btn-danger' onclick=\"jQuery('#grid').delGridRow('"+id+"',"+option+");\"  ><i class='fa fa-trash-o fa-lg'></i></a>";
  };

  var edit_button = function(id) {
    var option = "{ mtype:'PATCH', closeAfterEdit:true, url:'" + rest_url + id + "/'}";
    console.log(option);
    return "<a class='btn btn-success' onclick=\"jQuery('#grid').editGridRow('"+id+"',"+option+");\"  ><i class='fa fa-edit fa-lg'></i></a>";
  };

  $("#grid").jqGrid({
     datatype: 'json',
     url: rest_url,
     editurl: rest_url,
     caption: 'Server List',
     colNames:['', 'ID.','host', 'ip'],
     colModel :[
       {name:'act',index:'act', width:100, sortable:false}, // delete
       {name:'id', index:'id', editable:true, editoptions:{readonly:true}},
       {name:'host', index:'host', editable:true},
       {name:'ip', index:'ip', editable:true},
     ],
     jsonReader : {
       root: "results",
       page: "page",
       total: "count",
       records: function (obj) { return obj["results"].length; },
       repeatitems: true,
       id: "id",
       userdata: "userdata",
     },
    pager: '#pager',
    height: 'auto',
    //autowidth: true,
    scroll: false,
    rownumbers: true,
    rowNum: 10,
    rowList: [10,20,30],
    sortname: 'id',
    //sortorder: 'desc',
    viewrecords: true,
    gridComplete: function(){
       var ids = jQuery("#grid").jqGrid('getDataIDs');
       for(var i=0;i < ids.length;i++){
          var cl = ids[i];
          jQuery("#grid").jqGrid('setRowData',ids[i],{act:delete_button(cl) + edit_button(cl)});
       }
    },
  })
  .navGrid('#pager',
    {edit:false, add:true, del:false, search:false, refresh:false},
    {},
    add_options,
    {},
    {},
    {closeOnEscape:true}
  );
  $.extend($.jgrid.nav, {addicon: "<i class='fa fa-plus-circle'></i>"});
});