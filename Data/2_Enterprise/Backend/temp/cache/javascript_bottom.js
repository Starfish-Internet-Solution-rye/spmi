 function EAL(){var t=this;t.version="0.8.1.1";date=new Date();t.start_time=date.getTime();t.win="loading";t.error=false;t.baseURL="";t.template="";t.lang={};t.load_syntax={};t.syntax={};t.loadedFiles=[];t.waiting_loading={};t.scripts_to_load=[];t.sub_scripts_to_load=[];t.resize=[];t.hidden={};t.default_settings={debug:false,smooth_selection:true,font_size:"10",font_family:"monospace",start_highlight:false,toolbar:"search,go_to_line,fullscreen,|,undo,redo,|,select_font,|,change_smooth_selection,highlight,reset_highlight,word_wrap,|,help",begin_toolbar:"",end_toolbar:"",is_multi_files:false,allow_resize:"both",show_line_colors:false,min_width:400,min_height:125,replace_tab_by_spaces:false,allow_toggle:true,language:"en",syntax:"",syntax_selection_allow:"basic,brainfuck,c,coldfusion,cpp,css,html,java,js,pas,perl,php,python,ruby,robotstxt,sql,tsql,vb,xml",display:"onload",max_undo:30,browsers:"known",plugins:"",gecko_spellcheck:false,fullscreen:false,is_editable:true,cursor_position:"begin",word_wrap:false,autocompletion:false,load_callback:"",save_callback:"",change_callback:"",submit_callback:"",EA_init_callback:"",EA_delete_callback:"",EA_load_callback:"",EA_unload_callback:"",EA_toggle_on_callback:"",EA_toggle_off_callback:"",EA_file_switch_on_callback:"",EA_file_switch_off_callback:"",EA_file_close_callback:""};t.advanced_buttons=[ ['new_document','newdocument.gif','new_document',false],['search','search.gif','show_search',false],['go_to_line','go_to_line.gif','go_to_line',false],['undo','undo.gif','undo',true],['redo','redo.gif','redo',true],['change_smooth_selection','smooth_selection.gif','change_smooth_selection_mode',true],['reset_highlight','reset_highlight.gif','resync_highlight',true],['highlight','highlight.gif','change_highlight',true],['help','help.gif','show_help',false],['save','save.gif','save',false],['load','load.gif','load',false],['fullscreen','fullscreen.gif','toggle_full_screen',false],['word_wrap','word_wrap.gif','toggle_word_wrap',true],['autocompletion','autocompletion.gif','toggle_autocompletion',true] ];t.set_browser_infos(t);if(t.isIE>=6||t.isGecko||(t.isWebKit&&!t.isSafari<3)||t.isOpera>=9||t.isCamino)t.isValidBrowser=true;
else t.isValidBrowser=false;t.set_base_url();for(var i=0;i<t.scripts_to_load.length;i++){setTimeout("eAL.load_script('"+t.baseURL+t.scripts_to_load[i]+".js');",1);t.waiting_loading[t.scripts_to_load[i]+".js"]=false;}t.add_event(window,"load",EAL.prototype.window_loaded);};EAL.prototype={has_error:function(){this.error=true;for(var i in EAL.prototype){EAL.prototype[i]=function(){};}},set_browser_infos:function(o){ua=navigator.userAgent;o.isWebKit=/WebKit/.test(ua);o.isGecko=!o.isWebKit&&/Gecko/.test(ua);o.isMac=/Mac/.test(ua);o.isIE=(navigator.appName=="Microsoft Internet Explorer");if(o.isIE){o.isIE=ua.replace(/^.*?MSIE\s+([0-9\.]+).*$/,"$1");if(o.isIE<6)o.has_error();}if(o.isOpera=(ua.indexOf('Opera')!=-1)){o.isOpera=ua.replace(/^.*?Opera.*?([0-9\.]+).*$/i,"$1");if(o.isOpera<9)o.has_error();o.isIE=false;}if(o.isFirefox=(ua.indexOf('Firefox')!=-1))o.isFirefox=ua.replace(/^.*?Firefox.*?([0-9\.]+).*$/i,"$1");if(ua.indexOf('Iceweasel')!=-1)o.isFirefox=ua.replace(/^.*?Iceweasel.*?([0-9\.]+).*$/i,"$1");if(ua.indexOf('GranParadiso')!=-1)o.isFirefox=ua.replace(/^.*?GranParadiso.*?([0-9\.]+).*$/i,"$1");if(ua.indexOf('BonEcho')!=-1)o.isFirefox=ua.replace(/^.*?BonEcho.*?([0-9\.]+).*$/i,"$1");if(ua.indexOf('SeaMonkey')!=-1)o.isFirefox=(ua.replace(/^.*?SeaMonkey.*?([0-9\.]+).*$/i,"$1"))+1;if(o.isCamino=(ua.indexOf('Camino')!=-1))o.isCamino=ua.replace(/^.*?Camino.*?([0-9\.]+).*$/i,"$1");if(o.isSafari=(ua.indexOf('Safari')!=-1))o.isSafari=ua.replace(/^.*?Version\/([0-9]+\.[0-9]+).*$/i,"$1");if(o.isChrome=(ua.indexOf('Chrome')!=-1)){o.isChrome=ua.replace(/^.*?Chrome.*?([0-9\.]+).*$/i,"$1");o.isSafari=false;}},window_loaded:function(){eAL.win="loaded";if(document.forms){for(var i=0;i<document.forms.length;i++){var form=document.forms[i];form.edit_area_replaced_submit=null;try{form.edit_area_replaced_submit=form.onsubmit;form.onsubmit="";}catch(e){}eAL.add_event(form,"submit",EAL.prototype.submit);eAL.add_event(form,"reset",EAL.prototype.reset);}}eAL.add_event(window,"unload",function(){for(var i in eAs){eAL.delete_instance(i);}});},init_ie_textarea:function(id){var a=document.getElementById(id);try{if(a&&typeof(a.focused)=="undefined"){a.focus();a.focused=true;a.selectionStart=a.selectionEnd=0;get_IE_selection(a);eAL.add_event(a,"focus",IE_textarea_focus);eAL.add_event(a,"blur",IE_textarea_blur);}}catch(ex){}},init:function(settings){var t=this,s=settings,i;if(!s["id"])t.has_error();if(t.error)return;if(eAs[s["id"]])t.delete_instance(s["id"]);for(i in t.default_settings){if(typeof(s[i])=="undefined")s[i]=t.default_settings[i];}if(s["browsers"]=="known"&&t.isValidBrowser==false){return;}if(s["begin_toolbar"].length>0)s["toolbar"]=s["begin_toolbar"]+","+s["toolbar"];if(s["end_toolbar"].length>0)s["toolbar"]=s["toolbar"]+","+s["end_toolbar"];s["tab_toolbar"]=s["toolbar"].replace(/ /g,"").split(",");s["plugins"]=s["plugins"].replace(/ /g,"").split(",");for(i=0;i<s["plugins"].length;i++){if(s["plugins"][i].length==0)s["plugins"].splice(i,1);}t.get_template();t.load_script(t.baseURL+"langs/"+s["language"]+".js");if(s["syntax"].length>0){s["syntax"]=s["syntax"].toLowerCase();t.load_script(t.baseURL+"reg_syntax/"+s["syntax"]+".js");}eAs[s["id"]]={"settings":s};eAs[s["id"]]["displayed"]=false;eAs[s["id"]]["hidden"]=false;t.start(s["id"]);},delete_instance:function(id){var d=document,fs=window.frames,span,iframe;eAL.execCommand(id,"EA_delete");if(fs["frame_"+id]&&fs["frame_"+id].editArea){if(eAs[id]["displayed"])eAL.toggle(id,"off");fs["frame_"+id].editArea.execCommand("EA_unload");}span=d.getElementById("EditAreaArroundInfos_"+id);if(span)span.parentNode.removeChild(span);iframe=d.getElementById("frame_"+id);if(iframe){iframe.parentNode.removeChild(iframe);try{delete fs["frame_"+id];}catch(e){}}delete eAs[id];},start:function(id){var t=this,d=document,f,span,father,next,html='',html_toolbar_content='',template,content,i;if(t.win!="loaded"){setTimeout("eAL.start('"+id+"');",50);return;}for(i in t.waiting_loading){if(t.waiting_loading[i]!="loaded"&&typeof(t.waiting_loading[i])!="function"){setTimeout("eAL.start('"+id+"');",50);return;}}if(!t.lang[eAs[id]["settings"]["language"]]||(eAs[id]["settings"]["syntax"].length>0&&!t.load_syntax[eAs[id]["settings"]["syntax"]])){setTimeout("eAL.start('"+id+"');",50);return;}if(eAs[id]["settings"]["syntax"].length>0)t.init_syntax_regexp();if(!d.getElementById("EditAreaArroundInfos_"+id)&&(eAs[id]["settings"]["debug"]||eAs[id]["settings"]["allow_toggle"])){span=d.createElement("span");span.id="EditAreaArroundInfos_"+id;if(eAs[id]["settings"]["allow_toggle"]){checked=(eAs[id]["settings"]["display"]=="onload")?"checked='checked'":"";html+="<div id='edit_area_toggle_"+i+"'>";html+="<input id='edit_area_toggle_checkbox_"+id+"' class='toggle_"+id+"' type='checkbox' onclick='eAL.toggle(\""+id+"\");' accesskey='e' "+checked+" />";html+="<label for='edit_area_toggle_checkbox_"+id+"'>{$toggle}</label></div>";}if(eAs[id]["settings"]["debug"])html+="<textarea id='edit_area_debug_"+id+"' spellcheck='off' style='z-index:20;width:100%;height:120px;overflow:auto;border:solid black 1px;'></textarea><br />";html=t.translate(html,eAs[id]["settings"]["language"]);span.innerHTML=html;father=d.getElementById(id).parentNode;next=d.getElementById(id).nextSibling;if(next==null)father.appendChild(span);
else father.insertBefore(span,next);}if(!eAs[id]["initialized"]){t.execCommand(id,"EA_init");if(eAs[id]["settings"]["display"]=="later"){eAs[id]["initialized"]=true;return;}}if(t.isIE){t.init_ie_textarea(id);}area=eAs[id];for(i=0;i<area["settings"]["tab_toolbar"].length;i++){html_toolbar_content+=t.get_control_html(area["settings"]["tab_toolbar"][i],area["settings"]["language"]);}html_toolbar_content=t.translate(html_toolbar_content,area["settings"]["language"],"template");if(!t.iframe_script){t.iframe_script="";for(i=0;i<t.sub_scripts_to_load.length;i++)t.iframe_script+='<script language="javascript" type="text/javascript" src="'+t.baseURL+t.sub_scripts_to_load[i]+'.js"></script>';}for(i=0;i<area["settings"]["plugins"].length;i++){if(!t.all_plugins_loaded)t.iframe_script+='<script language="javascript" type="text/javascript" src="'+t.baseURL+'plugins/'+area["settings"]["plugins"][i]+'/'+area["settings"]["plugins"][i]+'.js"></script>';t.iframe_script+='<script language="javascript" type="text/javascript" src="'+t.baseURL+'plugins/'+area["settings"]["plugins"][i]+'/langs/'+area["settings"]["language"]+'.js"></script>';}if(!t.iframe_css){t.iframe_css="<link href='"+t.baseURL+"edit_area.css' rel='stylesheet' type='text/css' />";}template=t.template.replace(/\[__BASEURL__\]/g,t.baseURL);template=template.replace("[__TOOLBAR__]",html_toolbar_content);template=t.translate(template,area["settings"]["language"],"template");template=template.replace("[__CSSRULES__]",t.iframe_css);template=template.replace("[__JSCODE__]",t.iframe_script);template=template.replace("[__EA_VERSION__]",t.version);area.textarea=d.getElementById(area["settings"]["id"]);eAs[area["settings"]["id"]]["textarea"]=area.textarea;if(typeof(window.frames["frame_"+area["settings"]["id"]])!='undefined')delete window.frames["frame_"+area["settings"]["id"]];father=area.textarea.parentNode;content=d.createElement("iframe");content.name="frame_"+area["settings"]["id"];content.id="frame_"+area["settings"]["id"];content.style.borderWidth="0px";setAttribute(content,"frameBorder","0");content.style.overflow="hidden";content.style.display="none";next=area.textarea.nextSibling;if(next==null)father.appendChild(content);
else father.insertBefore(content,next);f=window.frames["frame_"+area["settings"]["id"]];f.document.open();f.eAs=eAs;f.area_id=area["settings"]["id"];f.document.area_id=area["settings"]["id"];f.document.write(template);f.document.close();},toggle:function(id,toggle_to){if(!toggle_to)toggle_to=(eAs[id]["displayed"]==true)?"off":"on";if(eAs[id]["displayed"]==true&&toggle_to=="off"){this.toggle_off(id);}
else if(eAs[id]["displayed"]==false&&toggle_to=="on"){this.toggle_on(id);}return false;},toggle_off:function(id){var fs=window.frames,f,t,parNod,nxtSib,selStart,selEnd,scrollTop,scrollLeft;if(fs["frame_"+id]){f=fs["frame_"+id];t=eAs[id]["textarea"];if(f.editArea.fullscreen['isFull'])f.editArea.toggle_full_screen(false);eAs[id]["displayed"]=false;t.wrap="off";setAttribute(t,"wrap","off");parNod=t.parentNode;nxtSib=t.nextSibling;parNod.removeChild(t);parNod.insertBefore(t,nxtSib);t.value=f.editArea.textarea.value;selStart=f.editArea.last_selection["selectionStart"];selEnd=f.editArea.last_selection["selectionEnd"];scrollTop=f.document.getElementById("result").scrollTop;scrollLeft=f.document.getElementById("result").scrollLeft;document.getElementById("frame_"+id).style.display='none';t.style.display="inline";try{t.focus();}catch(e){};if(this.isIE){t.selectionStart=selStart;t.selectionEnd=selEnd;t.focused=true;set_IE_selection(t);}
else{if(this.isOpera&&this.isOpera < 9.6){t.setSelectionRange(0,0);}try{t.setSelectionRange(selStart,selEnd);}catch(e){};}t.scrollTop=scrollTop;t.scrollLeft=scrollLeft;f.editArea.execCommand("toggle_off");}},toggle_on:function(id){var fs=window.frames,f,t,selStart=0,selEnd=0,scrollTop=0,scrollLeft=0,curPos,elem;if(fs["frame_"+id]){f=fs["frame_"+id];t=eAs[id]["textarea"];area=f.editArea;area.textarea.value=t.value;curPos=eAs[id]["settings"]["cursor_position"];if(t.use_last==true){selStart=t.last_selectionStart;selEnd=t.last_selectionEnd;scrollTop=t.last_scrollTop;scrollLeft=t.last_scrollLeft;t.use_last=false;}
else if(curPos=="auto"){try{selStart=t.selectionStart;selEnd=t.selectionEnd;scrollTop=t.scrollTop;scrollLeft=t.scrollLeft;}catch(ex){}}this.set_editarea_size_from_textarea(id,document.getElementById("frame_"+id));t.style.display="none";document.getElementById("frame_"+id).style.display="inline";area.execCommand("focus");eAs[id]["displayed"]=true;area.execCommand("update_size");f.document.getElementById("result").scrollTop=scrollTop;f.document.getElementById("result").scrollLeft=scrollLeft;area.area_select(selStart,selEnd-selStart);area.execCommand("toggle_on");}
else{elem=document.getElementById(id);elem.last_selectionStart=elem.selectionStart;elem.last_selectionEnd=elem.selectionEnd;elem.last_scrollTop=elem.scrollTop;elem.last_scrollLeft=elem.scrollLeft;elem.use_last=true;eAL.start(id);}},set_editarea_size_from_textarea:function(id,frame){var elem,width,height;elem=document.getElementById(id);width=Math.max(eAs[id]["settings"]["min_width"],elem.offsetWidth)+"px";height=Math.max(eAs[id]["settings"]["min_height"],elem.offsetHeight)+"px";if(elem.style.width.indexOf("%")!=-1)width=elem.style.width;if(elem.style.height.indexOf("%")!=-1)height=elem.style.height;frame.style.width=width;frame.style.height=height;},set_base_url:function(){var t=this,elems,i,docBasePath;if(!this.baseURL){elems=document.getElementsByTagName('script');for(i=0;i<elems.length;i++){if(elems[i].src&&elems[i].src.match(/edit_area_[^\\\/]*$/i)){var src=elems[i].src;src=src.substring(0,src.lastIndexOf('/'));this.baseURL=src;this.file_name=elems[i].src.substr(elems[i].src.lastIndexOf("/")+1);break;}}}docBasePath=document.location.href;if(docBasePath.indexOf('?')!=-1)docBasePath=docBasePath.substring(0,docBasePath.indexOf('?'));docBasePath=docBasePath.substring(0,docBasePath.lastIndexOf('/'));if(t.baseURL.indexOf('://')==-1&&t.baseURL.charAt(0)!='/'){t.baseURL=docBasePath+"/"+t.baseURL;}t.baseURL+="/";},get_button_html:function(id,img,exec,isFileSpecific,baseURL){var cmd,html;if(!baseURL)baseURL=this.baseURL;cmd='editArea.execCommand(\''+exec+'\')';html='<a id="a_'+id+'" href="javascript:'+cmd+'" onclick="'+cmd+';return false;" onmousedown="return false;" target="_self" fileSpecific="'+(isFileSpecific?'yes':'no')+'">';html+='<img id="'+id+'" src="'+baseURL+'images/'+img+'" title="{$'+id+'}" width="20" height="20" class="editAreaButtonNormal" onmouseover="editArea.switchClass(this,\'editAreaButtonOver\');" onmouseout="editArea.restoreClass(this);" onmousedown="editArea.restoreAndSwitchClass(this,\'editAreaButtonDown\');" /></a>';return html;},get_control_html:function(button_name,lang){var t=this,i,but,html,si;for(i=0;i<t.advanced_buttons.length;i++){but=t.advanced_buttons[i];if(but[0]==button_name){return t.get_button_html(but[0],but[1],but[2],but[3]);}}switch(button_name){case "*":case "return":return "<br />";case "|":case "separator":return '<img src="'+t.baseURL+'images/spacer.gif" width="1" height="15" class="editAreaSeparatorLine">';case "select_font":html="<select id='area_font_size' onchange='javascript:editArea.execCommand(\"change_font_size\")' fileSpecific='yes'>";html+="<option value='-1'>{$font_size}</option>";si=[8,9,10,11,12,14];for(i=0;i<si.length;i++){html+="<option value='"+si[i]+"'>"+si[i]+" pt</option>";}html+="</select>";return html;case "syntax_selection":html="<select id='syntax_selection' onchange='javascript:editArea.execCommand(\"change_syntax\",this.value)' fileSpecific='yes'>";html+="<option value='-1'>{$syntax_selection}</option>";html+="</select>";return html;}return "<span id='tmp_tool_"+button_name+"'>["+button_name+"]</span>";},get_template:function(){if(this.template==""){var xhr_object=null;if(window.XMLHttpRequest)xhr_object=new XMLHttpRequest();
else if(window.ActiveXObject)xhr_object=new ActiveXObject("Microsoft.XMLHTTP");
else{alert("XMLHTTPRequest not supported. EditArea not loaded");return;}xhr_object.open("GET",this.baseURL+"template.html",false);xhr_object.send(null);if(xhr_object.readyState==4)this.template=xhr_object.responseText;
else this.has_error();}},translate:function(text,lang,mode){if(mode=="word")text=eAL.get_word_translation(text,lang);
else if(mode="template"){eAL.current_language=lang;text=text.replace(/\{\$([^\}]+)\}/gm,eAL.translate_template);}return text;},translate_template:function(){return eAL.get_word_translation(EAL.prototype.translate_template.arguments[1],eAL.current_language);},get_word_translation:function(val,lang){var i;for(i in eAL.lang[lang]){if(i==val)return eAL.lang[lang][i];}return "_"+val;},load_script:function(url){var t=this,d=document,script,head;if(t.loadedFiles[url])return;try{script=d.createElement("script");script.type="text/javascript";script.src=url;script.charset="UTF-8";d.getElementsByTagName("head")[0].appendChild(script);}catch(e){d.write('<sc'+'ript language="javascript" type="text/javascript" src="'+url+'" charset="UTF-8"></sc'+'ript>');}t.loadedFiles[url]=true;},add_event:function(obj,name,handler){try{if(obj.attachEvent){obj.attachEvent("on"+name,handler);}
else{obj.addEventListener(name,handler,false);}}catch(e){}},remove_event:function(obj,name,handler){try{if(obj.detachEvent)obj.detachEvent("on"+name,handler);
else obj.removeEventListener(name,handler,false);}catch(e){}},reset:function(e){var formObj,is_child,i,x;formObj=eAL.isIE ? window.event.srcElement:e.target;if(formObj.tagName!='FORM')formObj=formObj.form;for(i in eAs){is_child=false;for(x=0;x<formObj.elements.length;x++){if(formObj.elements[x].id==i)is_child=true;}if(window.frames["frame_"+i]&&is_child&&eAs[i]["displayed"]==true){var exec='window.frames["frame_'+i+'"].editArea.textarea.value=document.getElementById("'+i+'").value;';exec+='window.frames["frame_'+i+'"].editArea.execCommand("focus");';exec+='window.frames["frame_'+i+'"].editArea.check_line_selection();';exec+='window.frames["frame_'+i+'"].editArea.execCommand("reset");';window.setTimeout(exec,10);}}return;},submit:function(e){var formObj,is_child,fs=window.frames,i,x;formObj=eAL.isIE ? window.event.srcElement:e.target;if(formObj.tagName!='FORM')formObj=formObj.form;for(i in eAs){is_child=false;for(x=0;x<formObj.elements.length;x++){if(formObj.elements[x].id==i)is_child=true;}if(is_child){if(fs["frame_"+i]&&eAs[i]["displayed"]==true)document.getElementById(i).value=fs["frame_"+i].editArea.textarea.value;eAL.execCommand(i,"EA_submit");}}if(typeof(formObj.edit_area_replaced_submit)=="function"){res=formObj.edit_area_replaced_submit();if(res==false){if(eAL.isIE)return false;
else e.preventDefault();}}return;},getValue:function(id){if(window.frames["frame_"+id]&&eAs[id]["displayed"]==true){return window.frames["frame_"+id].editArea.textarea.value;}
else if(elem=document.getElementById(id)){return elem.value;}return false;},setValue:function(id,new_val){var fs=window.frames;if((f=fs["frame_"+id])&&eAs[id]["displayed"]==true){f.editArea.textarea.value=new_val;f.editArea.execCommand("focus");f.editArea.check_line_selection(false);f.editArea.execCommand("onchange");}
else if(elem=document.getElementById(id)){elem.value=new_val;}},getSelectionRange:function(id){var sel,eA,fs=window.frames;sel={"start":0,"end":0};if(fs["frame_"+id]&&eAs[id]["displayed"]==true){eA=fs["frame_"+id].editArea;sel["start"]=eA.textarea.selectionStart;sel["end"]=eA.textarea.selectionEnd;}
else if(elem=document.getElementById(id)){sel=getSelectionRange(elem);}return sel;},setSelectionRange:function(id,new_start,new_end){var fs=window.frames;if(fs["frame_"+id]&&eAs[id]["displayed"]==true){fs["frame_"+id].editArea.area_select(new_start,new_end-new_start);if(!this.isIE){fs["frame_"+id].editArea.check_line_selection(false);fs["frame_"+id].editArea.scroll_to_view();}}
else if(elem=document.getElementById(id)){setSelectionRange(elem,new_start,new_end);}},getSelectedText:function(id){var sel=this.getSelectionRange(id);return this.getValue(id).substring(sel["start"],sel["end"]);},setSelectedText:function(id,new_val){var fs=window.frames,d=document,sel,text,scrollTop,scrollLeft,new_sel_end;new_val=new_val.replace(/\r/g,"");sel=this.getSelectionRange(id);text=this.getValue(id);if(fs["frame_"+id]&&eAs[id]["displayed"]==true){scrollTop=fs["frame_"+id].document.getElementById("result").scrollTop;scrollLeft=fs["frame_"+id].document.getElementById("result").scrollLeft;}
else{scrollTop=d.getElementById(id).scrollTop;scrollLeft=d.getElementById(id).scrollLeft;}text=text.substring(0,sel["start"])+new_val+text.substring(sel["end"]);this.setValue(id,text);new_sel_end=sel["start"]+new_val.length;this.setSelectionRange(id,sel["start"],new_sel_end);if(new_val !=this.getSelectedText(id).replace(/\r/g,"")){this.setSelectionRange(id,sel["start"],new_sel_end+new_val.split("\n").length-1);}if(fs["frame_"+id]&&eAs[id]["displayed"]==true){fs["frame_"+id].document.getElementById("result").scrollTop=scrollTop;fs["frame_"+id].document.getElementById("result").scrollLeft=scrollLeft;fs["frame_"+id].editArea.execCommand("onchange");}
else{d.getElementById(id).scrollTop=scrollTop;d.getElementById(id).scrollLeft=scrollLeft;}},insertTags:function(id,open_tag,close_tag){var old_sel,new_sel;old_sel=this.getSelectionRange(id);text=open_tag+this.getSelectedText(id)+close_tag;eAL.setSelectedText(id,text);new_sel=this.getSelectionRange(id);if(old_sel["end"] > old_sel["start"])this.setSelectionRange(id,new_sel["end"],new_sel["end"]);
else this.setSelectionRange(id,old_sel["start"]+open_tag.length,old_sel["start"]+open_tag.length);},hide:function(id){var fs=window.frames,d=document,t=this,scrollTop,scrollLeft,span;if(d.getElementById(id)&&!t.hidden[id]){t.hidden[id]={};t.hidden[id]["selectionRange"]=t.getSelectionRange(id);if(d.getElementById(id).style.display!="none"){t.hidden[id]["scrollTop"]=d.getElementById(id).scrollTop;t.hidden[id]["scrollLeft"]=d.getElementById(id).scrollLeft;}if(fs["frame_"+id]){t.hidden[id]["toggle"]=eAs[id]["displayed"];if(fs["frame_"+id]&&eAs[id]["displayed"]==true){scrollTop=fs["frame_"+id].document.getElementById("result").scrollTop;scrollLeft=fs["frame_"+id].document.getElementById("result").scrollLeft;}
else{scrollTop=d.getElementById(id).scrollTop;scrollLeft=d.getElementById(id).scrollLeft;}t.hidden[id]["scrollTop"]=scrollTop;t.hidden[id]["scrollLeft"]=scrollLeft;if(eAs[id]["displayed"]==true)eAL.toggle_off(id);}span=d.getElementById("EditAreaArroundInfos_"+id);if(span){span.style.display='none';}d.getElementById(id).style.display="none";}},show:function(id){var fs=window.frames,d=document,t=this,span;if((elem=d.getElementById(id))&&t.hidden[id]){elem.style.display="inline";elem.scrollTop=t.hidden[id]["scrollTop"];elem.scrollLeft=t.hidden[id]["scrollLeft"];span=d.getElementById("EditAreaArroundInfos_"+id);if(span){span.style.display='inline';}if(fs["frame_"+id]){elem.style.display="inline";if(t.hidden[id]["toggle"]==true)eAL.toggle_on(id);scrollTop=t.hidden[id]["scrollTop"];scrollLeft=t.hidden[id]["scrollLeft"];if(fs["frame_"+id]&&eAs[id]["displayed"]==true){fs["frame_"+id].document.getElementById("result").scrollTop=scrollTop;fs["frame_"+id].document.getElementById("result").scrollLeft=scrollLeft;}
else{elem.scrollTop=scrollTop;elem.scrollLeft=scrollLeft;}}sel=t.hidden[id]["selectionRange"];t.setSelectionRange(id,sel["start"],sel["end"]);delete t.hidden[id];}},getCurrentFile:function(id){return this.execCommand(id,'get_file',this.execCommand(id,'curr_file'));},getFile:function(id,file_id){return this.execCommand(id,'get_file',file_id);},getAllFiles:function(id){return this.execCommand(id,'get_all_files()');},openFile:function(id,file_infos){return this.execCommand(id,'open_file',file_infos);},closeFile:function(id,file_id){return this.execCommand(id,'close_file',file_id);},setFileEditedMode:function(id,file_id,to){var reg1,reg2;reg1=new RegExp('\\\\','g');reg2=new RegExp('"','g');return this.execCommand(id,'set_file_edited_mode("'+file_id.replace(reg1,'\\\\').replace(reg2,'\\"')+'",'+to+')');},execCommand:function(id,cmd,fct_param){switch(cmd){case "EA_init":if(eAs[id]['settings']["EA_init_callback"].length>0)eval(eAs[id]['settings']["EA_init_callback"]+"('"+id+"');");break;case "EA_delete":if(eAs[id]['settings']["EA_delete_callback"].length>0)eval(eAs[id]['settings']["EA_delete_callback"]+"('"+id+"');");break;case "EA_submit":if(eAs[id]['settings']["submit_callback"].length>0)eval(eAs[id]['settings']["submit_callback"]+"('"+id+"');");break;}if(window.frames["frame_"+id]&&window.frames["frame_"+id].editArea){if(fct_param!=undefined)return eval('window.frames["frame_'+id+'"].editArea.'+cmd+'(fct_param);');
else return eval('window.frames["frame_'+id+'"].editArea.'+cmd+';');}return false;}};var eAL=new EAL();var eAs={}; function getAttribute(elm,aName){var aValue,taName,i;try{aValue=elm.getAttribute(aName);}catch(exept){}if(! aValue){for(i=0;i < elm.attributes.length;i++){taName=elm.attributes[i] .name.toLowerCase();if(taName==aName){aValue=elm.attributes[i] .value;return aValue;}}}return aValue;};function setAttribute(elm,attr,val){if(attr=="class"){elm.setAttribute("className",val);elm.setAttribute("class",val);}
else{elm.setAttribute(attr,val);}};function getChildren(elem,elem_type,elem_attribute,elem_attribute_match,option,depth){if(!option)var option="single";if(!depth)var depth=-1;if(elem){var children=elem.childNodes;var result=null;var results=[];for(var x=0;x<children.length;x++){strTagName=new String(children[x].tagName);children_class="?";if(strTagName!="undefined"){child_attribute=getAttribute(children[x],elem_attribute);if((strTagName.toLowerCase()==elem_type.toLowerCase()||elem_type=="")&&(elem_attribute==""||child_attribute==elem_attribute_match)){if(option=="all"){results.push(children[x]);}
else{return children[x];}}if(depth!=0){result=getChildren(children[x],elem_type,elem_attribute,elem_attribute_match,option,depth-1);if(option=="all"){if(result.length>0){results=results.concat(result);}}
else if(result!=null){return result;}}}}if(option=="all")return results;}return null;};function isChildOf(elem,parent){if(elem){if(elem==parent)return true;while(elem.parentNode !='undefined'){return isChildOf(elem.parentNode,parent);}}return false;};function getMouseX(e){if(e!=null&&typeof(e.pageX)!="undefined"){return e.pageX;}
else{return(e!=null?e.x:event.x)+document.documentElement.scrollLeft;}};function getMouseY(e){if(e!=null&&typeof(e.pageY)!="undefined"){return e.pageY;}
else{return(e!=null?e.y:event.y)+document.documentElement.scrollTop;}};function calculeOffsetLeft(r){return calculeOffset(r,"offsetLeft")};function calculeOffsetTop(r){return calculeOffset(r,"offsetTop")};function calculeOffset(element,attr){var offset=0;while(element){offset+=element[attr];element=element.offsetParent}return offset;};function get_css_property(elem,prop){if(document.defaultView){return document.defaultView.getComputedStyle(elem,null).getPropertyValue(prop);}
else if(elem.currentStyle){var prop=prop.replace(/-\D/gi,function(sMatch){return sMatch.charAt(sMatch.length-1).toUpperCase();});return elem.currentStyle[prop];}
else return null;}var _mCE;function start_move_element(e,id,frame){var elem_id=(e.target||e.srcElement).id;if(id)elem_id=id;if(!frame)frame=window;if(frame.event)e=frame.event;_mCE=frame.document.getElementById(elem_id);_mCE.frame=frame;frame.document.onmousemove=move_element;frame.document.onmouseup=end_move_element;mouse_x=getMouseX(e);mouse_y=getMouseY(e);_mCE.start_pos_x=mouse_x-(_mCE.style.left.replace("px","")||calculeOffsetLeft(_mCE));_mCE.start_pos_y=mouse_y-(_mCE.style.top.replace("px","")||calculeOffsetTop(_mCE));return false;};function end_move_element(e){_mCE.frame.document.onmousemove="";_mCE.frame.document.onmouseup="";_mCE=null;};function move_element(e){var newTop,newLeft,maxLeft;if(_mCE.frame&&_mCE.frame.event)e=_mCE.frame.event;newTop=getMouseY(e)-_mCE.start_pos_y;newLeft=getMouseX(e)-_mCE.start_pos_x;maxLeft=_mCE.frame.document.body.offsetWidth-_mCE.offsetWidth;max_top=_mCE.frame.document.body.offsetHeight-_mCE.offsetHeight;newTop=Math.min(Math.max(0,newTop),max_top);newLeft=Math.min(Math.max(0,newLeft),maxLeft);_mCE.style.top=newTop+"px";_mCE.style.left=newLeft+"px";return false;};var nav=eAL.nav;function getSelectionRange(textarea){return{"start":textarea.selectionStart,"end":textarea.selectionEnd};};function setSelectionRange(t,start,end){t.focus();start=Math.max(0,Math.min(t.value.length,start));end=Math.max(start,Math.min(t.value.length,end));if(this.isOpera&&this.isOpera < 9.6){t.selectionEnd=1;t.selectionStart=0;t.selectionEnd=1;t.selectionStart=0;}t.selectionStart=start;t.selectionEnd=end;if(isIE)set_IE_selection(t);};function get_IE_selection(t){var d=document,div,range,stored_range,elem,scrollTop,relative_top,line_start,line_nb,range_start,range_end,tab;if(t&&t.focused){if(!t.ea_line_height){div=d.createElement("div");div.style.fontFamily=get_css_property(t,"font-family");div.style.fontSize=get_css_property(t,"font-size");div.style.visibility="hidden";div.innerHTML="0";d.body.appendChild(div);t.ea_line_height=div.offsetHeight;d.body.removeChild(div);}range=d.selection.createRange();try{stored_range=range.duplicate();stored_range.moveToElementText(t);stored_range.setEndPoint('EndToEnd',range);if(stored_range.parentElement()==t){elem=t;scrollTop=0;while(elem.parentNode){scrollTop+=elem.scrollTop;elem=elem.parentNode;}relative_top=range.offsetTop-calculeOffsetTop(t)+scrollTop;line_start=Math.round((relative_top / t.ea_line_height)+1);line_nb=Math.round(range.boundingHeight / t.ea_line_height);range_start=stored_range.text.length-range.text.length;tab=t.value.substr(0,range_start).split("\n");range_start+=(line_start-tab.length)*2;t.selectionStart=range_start;range_end=t.selectionStart+range.text.length;tab=t.value.substr(0,range_start+range.text.length).split("\n");range_end+=(line_start+line_nb-1-tab.length)*2;t.selectionEnd=range_end;}}catch(e){}}setTimeout("get_IE_selection(document.getElementById('"+t.id+"'));",50);};function IE_textarea_focus(){event.srcElement.focused=true;}function IE_textarea_blur(){event.srcElement.focused=false;}function set_IE_selection(t){var nbLineStart,nbLineStart,nbLineEnd,range;if(!window.closed){nbLineStart=t.value.substr(0,t.selectionStart).split("\n").length-1;nbLineEnd=t.value.substr(0,t.selectionEnd).split("\n").length-1;try{range=document.selection.createRange();range.moveToElementText(t);range.setEndPoint('EndToStart',range);range.moveStart('character',t.selectionStart-nbLineStart);range.moveEnd('character',t.selectionEnd-nbLineEnd-(t.selectionStart-nbLineStart));range.select();}catch(e){}}};eAL.waiting_loading["elements_functions.js"]="loaded";
 EAL.prototype.start_resize_area=function(){var d=document,a,div,width,height,father;d.onmouseup=eAL.end_resize_area;d.onmousemove=eAL.resize_area;eAL.toggle(eAL.resize["id"]);a=eAs[eAL.resize["id"]]["textarea"];div=d.getElementById("edit_area_resize");if(!div){div=d.createElement("div");div.id="edit_area_resize";div.style.border="dashed #888888 1px";}width=a.offsetWidth-2;height=a.offsetHeight-2;div.style.display="block";div.style.width=width+"px";div.style.height=height+"px";father=a.parentNode;father.insertBefore(div,a);a.style.display="none";eAL.resize["start_top"]=calculeOffsetTop(div);eAL.resize["start_left"]=calculeOffsetLeft(div);};EAL.prototype.end_resize_area=function(e){var d=document,div,a,width,height;d.onmouseup="";d.onmousemove="";div=d.getElementById("edit_area_resize");a=eAs[eAL.resize["id"]]["textarea"];width=Math.max(eAs[eAL.resize["id"]]["settings"]["min_width"],div.offsetWidth-4);height=Math.max(eAs[eAL.resize["id"]]["settings"]["min_height"],div.offsetHeight-4);if(eAL.isIE==6){width-=2;height-=2;}a.style.width=width+"px";a.style.height=height+"px";div.style.display="none";a.style.display="inline";a.selectionStart=eAL.resize["selectionStart"];a.selectionEnd=eAL.resize["selectionEnd"];eAL.toggle(eAL.resize["id"]);return false;};EAL.prototype.resize_area=function(e){var allow,newHeight,newWidth;allow=eAs[eAL.resize["id"]]["settings"]["allow_resize"];if(allow=="both"||allow=="y"){newHeight=Math.max(20,getMouseY(e)-eAL.resize["start_top"]);document.getElementById("edit_area_resize").style.height=newHeight+"px";}if(allow=="both"||allow=="x"){newWidth=Math.max(20,getMouseX(e)-eAL.resize["start_left"]);document.getElementById("edit_area_resize").style.width=newWidth+"px";}return false;};eAL.waiting_loading["resize_area.js"]="loaded";
	EAL.prototype.get_regexp=function(text_array){res="(\\b)(";for(i=0;i<text_array.length;i++){if(i>0)res+="|";res+=this.get_escaped_regexp(text_array[i]);}res+=")(\\b)";reg=new RegExp(res);return res;};EAL.prototype.get_escaped_regexp=function(str){return str.toString().replace(/(\.|\?|\*|\+|\\|\(|\)|\[|\]|\}|\{|\$|\^|\|)/g,"\\$1");};EAL.prototype.init_syntax_regexp=function(){var lang_style={};for(var lang in this.load_syntax){if(!this.syntax[lang]){this.syntax[lang]={};this.syntax[lang]["keywords_reg_exp"]={};this.keywords_reg_exp_nb=0;if(this.load_syntax[lang]['KEYWORDS']){param="g";if(this.load_syntax[lang]['KEYWORD_CASE_SENSITIVE']===false)param+="i";for(var i in this.load_syntax[lang]['KEYWORDS']){if(typeof(this.load_syntax[lang]['KEYWORDS'][i])=="function")continue;this.syntax[lang]["keywords_reg_exp"][i]=new RegExp(this.get_regexp(this.load_syntax[lang]['KEYWORDS'][i]),param);this.keywords_reg_exp_nb++;}}if(this.load_syntax[lang]['OPERATORS']){var str="";var nb=0;for(var i in this.load_syntax[lang]['OPERATORS']){if(typeof(this.load_syntax[lang]['OPERATORS'][i])=="function")continue;if(nb>0)str+="|";str+=this.get_escaped_regexp(this.load_syntax[lang]['OPERATORS'][i]);nb++;}if(str.length>0)this.syntax[lang]["operators_reg_exp"]=new RegExp("("+str+")","g");}if(this.load_syntax[lang]['DELIMITERS']){var str="";var nb=0;for(var i in this.load_syntax[lang]['DELIMITERS']){if(typeof(this.load_syntax[lang]['DELIMITERS'][i])=="function")continue;if(nb>0)str+="|";str+=this.get_escaped_regexp(this.load_syntax[lang]['DELIMITERS'][i]);nb++;}if(str.length>0)this.syntax[lang]["delimiters_reg_exp"]=new RegExp("("+str+")","g");}var syntax_trace=[];this.syntax[lang]["quotes"]={};var quote_tab=[];if(this.load_syntax[lang]['QUOTEMARKS']){for(var i in this.load_syntax[lang]['QUOTEMARKS']){if(typeof(this.load_syntax[lang]['QUOTEMARKS'][i])=="function")continue;var x=this.get_escaped_regexp(this.load_syntax[lang]['QUOTEMARKS'][i]);this.syntax[lang]["quotes"][x]=x;quote_tab[quote_tab.length]="("+x+"(\\\\.|[^"+x+"])*(?:"+x+"|$))";syntax_trace.push(x);}}this.syntax[lang]["comments"]={};if(this.load_syntax[lang]['COMMENT_SINGLE']){for(var i in this.load_syntax[lang]['COMMENT_SINGLE']){if(typeof(this.load_syntax[lang]['COMMENT_SINGLE'][i])=="function")continue;var x=this.get_escaped_regexp(this.load_syntax[lang]['COMMENT_SINGLE'][i]);quote_tab[quote_tab.length]="("+x+"(.|\\r|\\t)*(\\n|$))";syntax_trace.push(x);this.syntax[lang]["comments"][x]="\n";}}if(this.load_syntax[lang]['COMMENT_MULTI']){for(var i in this.load_syntax[lang]['COMMENT_MULTI']){if(typeof(this.load_syntax[lang]['COMMENT_MULTI'][i])=="function")continue;var start=this.get_escaped_regexp(i);var end=this.get_escaped_regexp(this.load_syntax[lang]['COMMENT_MULTI'][i]);quote_tab[quote_tab.length]="("+start+"(.|\\n|\\r)*?("+end+"|$))";syntax_trace.push(start);syntax_trace.push(end);this.syntax[lang]["comments"][i]=this.load_syntax[lang]['COMMENT_MULTI'][i];}}if(quote_tab.length>0)this.syntax[lang]["comment_or_quote_reg_exp"]=new RegExp("("+quote_tab.join("|")+")","gi");if(syntax_trace.length>0)this.syntax[lang]["syntax_trace_regexp"]=new RegExp("((.|\n)*?)(\\\\*("+syntax_trace.join("|")+"|$))","gmi");if(this.load_syntax[lang]['SCRIPT_DELIMITERS']){this.syntax[lang]["script_delimiters"]={};for(var i in this.load_syntax[lang]['SCRIPT_DELIMITERS']){if(typeof(this.load_syntax[lang]['SCRIPT_DELIMITERS'][i])=="function")continue;this.syntax[lang]["script_delimiters"][i]=this.load_syntax[lang]['SCRIPT_DELIMITERS'];}}this.syntax[lang]["custom_regexp"]={};if(this.load_syntax[lang]['REGEXPS']){for(var i in this.load_syntax[lang]['REGEXPS']){if(typeof(this.load_syntax[lang]['REGEXPS'][i])=="function")continue;var val=this.load_syntax[lang]['REGEXPS'][i];if(!this.syntax[lang]["custom_regexp"][val['execute']])this.syntax[lang]["custom_regexp"][val['execute']]={};this.syntax[lang]["custom_regexp"][val['execute']][i]={'regexp':new RegExp(val['search'],val['modifiers']),'class':val['class']};}}if(this.load_syntax[lang]['STYLES']){lang_style[lang]={};for(var i in this.load_syntax[lang]['STYLES']){if(typeof(this.load_syntax[lang]['STYLES'][i])=="function")continue;if(typeof(this.load_syntax[lang]['STYLES'][i])!="string"){for(var j in this.load_syntax[lang]['STYLES'][i]){lang_style[lang][j]=this.load_syntax[lang]['STYLES'][i][j];}}
else{lang_style[lang][i]=this.load_syntax[lang]['STYLES'][i];}}}var style="";for(var i in lang_style[lang]){if(lang_style[lang][i].length>0){style+="."+lang+" ."+i.toLowerCase()+" span{"+lang_style[lang][i]+"}\n";style+="."+lang+" ."+i.toLowerCase()+"{"+lang_style[lang][i]+"}\n";}}this.syntax[lang]["styles"]=style;}}};eAL.waiting_loading["reg_syntax.js"]="loaded";
var editAreaLoader= eAL;var editAreas=eAs;EditAreaLoader=EAL;editAreaLoader.iframe_script= "<script type='text/javascript'> Ã EA(){var t=Á;t.error=Ì;t.inlinePopup=[{popup_id:\"area_search_replace\",icon_id:\"search\"},{popup_id:\"edit_area_help\",icon_id:\"help\"}];t.plugins={};t.line_number=0;È.eAL.set_browser_infos(t);if(t.isIE >=8)t.isIE=7;t.É={};t.last_text_to_highlight=\"\";t.last_hightlighted_text=\"\";t.syntax_list=[];t.allready_used_syntax={};t.check_line_selection_timer=50;t.ÂFocused=Ì;t.highlight_selection_line=null;t.previous=[];t.next=[];t.last_undo=\"\";t.files={};t.filesIdAssoc={};t.curr_file='';t.assocBracket={};t.revertAssocBracket={};t.assocBracket[\"(\"]=\")\";t.assocBracket[\"{\"]=\"}\";t.assocBracket[\"[\"]=\"]\";for(var index in t.assocBracket){t.revertAssocBracket[t.assocBracket[index]]=index;}t.is_editable=Ë;t.lineHeight=16;t.tab_nb_char=8;if(t.isOpera)t.tab_nb_char=6;t.is_tabbing=Ì;t.fullscreen={'isFull':Ì};t.isResizing=Ì;t.id=area_id;t.Å=eAs[t.id][\"Å\"];if((\"\"+t.Å['replace_tab_by_spaces']).match(/^[0-9]+$/)){t.tab_nb_char=t.Å['replace_tab_by_spaces'];t.tabulation=\"\";for(var i=0;i<t.tab_nb_char;i++)t.tabulation+=\" \";}\nelse{t.tabulation=\"\t\";}if(t.Å[\"syntax_selection_allow\"]&&t.Å[\"syntax_selection_allow\"].Æ>0)t.syntax_list=t.Å[\"syntax_selection_allow\"].replace(/ /g,\"\").split(\",\");if(t.Å['syntax'])t.allready_used_syntax[t.Å['syntax']]=Ë;};EA.Ä.init=Ã(){var t=Á,a,s=t.Å;t.Â=_$(\"Â\");t.container=_$(\"container\");t.result=_$(\"result\");t.content_highlight=_$(\"content_highlight\");t.selection_field=_$(\"selection_field\");t.selection_field_text=_$(\"selection_field_text\");t.processing_screen=_$(\"processing\");t.editor_area=_$(\"editor\");t.tab_browsing_area=_$(\"tab_browsing_area\");t.test_font_size=_$(\"test_font_size\");a=t.Â;if(!s['is_editable'])t.set_editable(Ì);t.set_show_line_colors(s['show_line_colors']);if(syntax_selec=_$(\"syntax_selection\")){for(var i=0;i<t.syntax_list.Æ;i++){var syntax=t.syntax_list[i];var option=document.createElement(\"option\");option.Ê=syntax;if(syntax==s['syntax'])option.selected=\"selected\";option.innerHTML=t.get_translation(\"syntax_\"+syntax,\"word\");syntax_selec.appendChild(option);}}spans=È.getChildren(_$(\"toolbar_1\"),\"span\",\"\",\"\",\"all\",-1);for(var i=0;i<spans.Æ;i++){id=spans[i].id.replace(/tmp_tool_(.*)/,\"$1\");if(id!=spans[i].id){for(var j in t.plugins){if(typeof(t.plugins[j].get_control_html)==\"Ã\"){html=t.plugins[j].get_control_html(id);if(html!=Ì){html=t.get_translation(html,\"template\");var new_span=document.createElement(\"span\");new_span.innerHTML=html;var father=spans[i].ÈNode;spans[i].ÈNode.replaceChild(new_span,spans[i]);break;}}}}}if(s[\"debug\"]){t.debug=È.document.getElementById(\"edit_area_debug_\"+t.id);}if(_$(\"redo\")!=null)t.switchClassSticky(_$(\"redo\"),'editAreaButtonDisabled',Ë);if(typeof(È.eAL.syntax[s[\"syntax\"]])!=\"undefined\"){for(var i in È.eAL.syntax){if(typeof(È.eAL.syntax[i][\"Çs\"])!=\"undefined\"){t.add_Ç(È.eAL.syntax[i][\"Çs\"]);}}}if(t.isOpera)_$(\"editor\").onkeypress=keyDown;\nelse _$(\"editor\").onkeydown=keyDown;for(var i=0;i<t.inlinePopup.Æ;i++){if(t.isOpera)_$(t.inlinePopup[i][\"popup_id\"]).onkeypress=keyDown;\nelse _$(t.inlinePopup[i][\"popup_id\"]).onkeydown=keyDown;}if(s[\"allow_resize\"]==\"both\"||s[\"allow_resize\"]==\"x\"||s[\"allow_resize\"]==\"y\")t.allow_resize(Ë);È.eAL.toggle(t.id,\"on\");t.change_smooth_selection_mode(eA.smooth_selection);t.execCommand(\"change_highlight\",s[\"start_highlight\"]);t.set_font(eA.Å[\"font_family\"],eA.Å[\"font_size\"]);children=È.getChildren(document.body,\"\",\"selec\",\"none\",\"all\",-1);for(var i=0;i<children.Æ;i++){if(t.isIE)children[i].unselectable=Ë;\nelse children[i].onmousedown=Ã(){return Ì};}a.spellcheck=s[\"gecko_spellcheck\"];if(t.isFirefox >='3'){t.content_highlight.Ç.paddingLeft=\"1px\";t.selection_field.Ç.paddingLeft=\"1px\";t.selection_field_text.Ç.paddingLeft=\"1px\";}if(t.isIE&&t.isIE < 8){a.Ç.marginTop=\"-1px\";}if(t.isSafari){t.editor_area.Ç.position=\"absolute\";a.Ç.marginLeft=\"-3px\";if(t.isSafari < 3.2)a.Ç.marginTop=\"1px\";}È.eAL.add_event(t.result,\"click\",Ã(e){if((e.target||e.srcElement)==eA.result){eA.area_select(eA.Â.Ê.Æ,0);}});if(s['is_multi_files']!=Ì)t.open_file({'id':t.curr_file,'text':''});t.set_word_wrap(s['word_wrap']);setTimeout(\"eA.focus();eA.manage_size();eA.execCommand('EA_load');\",10);t.check_undo();t.check_line_selection(Ë);t.scroll_to_view();for(var i in t.plugins){if(typeof(t.plugins[i].onload)==\"Ã\")t.plugins[i].onload();}if(s['fullscreen']==Ë)t.toggle_full_screen(Ë);È.eAL.add_event(window,\"resize\",eA.update_size);È.eAL.add_event(È.window,\"resize\",eA.update_size);È.eAL.add_event(top.window,\"resize\",eA.update_size);È.eAL.add_event(window,\"unload\",Ã(){if(È.eAL){È.eAL.remove_event(È.window,\"resize\",eA.update_size);È.eAL.remove_event(top.window,\"resize\",eA.update_size);}if(eAs[eA.id]&&eAs[eA.id][\"displayed\"]){eA.execCommand(\"EA_unload\");}});};EA.Ä.update_size=Ã(){var d=document,pd=È.document,height,width,popup,maxLeft,maxTop;if(typeof eAs !='undefined'&&eAs[eA.id]&&eAs[eA.id][\"displayed\"]==Ë){if(eA.fullscreen['isFull']){pd.getElementById(\"frame_\"+eA.id).Ç.width=pd.getElementsByTagName(\"html\")[0].clientWidth+\"px\";pd.getElementById(\"frame_\"+eA.id).Ç.height=pd.getElementsByTagName(\"html\")[0].clientHeight+\"px\";}if(eA.tab_browsing_area.Ç.display=='block'&&(!eA.isIE||eA.isIE >=8)){eA.tab_browsing_area.Ç.height=\"0px\";eA.tab_browsing_area.Ç.height=(eA.result.offsetTop-eA.tab_browsing_area.offsetTop-1)+\"px\";}height=d.body.offsetHeight-eA.get_all_toolbar_height()-4;eA.result.Ç.height=height+\"px\";width=d.body.offsetWidth-2;eA.result.Ç.width=width+\"px\";for(i=0;i < eA.inlinePopup.Æ;i++){popup=_$(eA.inlinePopup[i][\"popup_id\"]);maxLeft=d.body.offsetWidth-popup.offsetWidth;maxTop=d.body.offsetHeight-popup.offsetHeight;if(popup.offsetTop > maxTop)popup.Ç.top=maxTop+\"px\";if(popup.offsetLeft > maxLeft)popup.Ç.left=maxLeft+\"px\";}eA.manage_size(Ë);eA.fixLinesHeight(eA.Â.Ê,0,-1);}};EA.Ä.manage_size=Ã(onlyOneTime){if(!eAs[Á.id])return Ì;if(eAs[Á.id][\"displayed\"]==Ë&&Á.ÂFocused){var area_height,resized=Ì;if(!Á.Å['word_wrap']){var area_width=Á.Â.scrollWidth;area_height=Á.Â.scrollHeight;if(Á.isOpera&&Á.isOpera < 9.6){area_width=10000;}if(Á.Â.previous_scrollWidth!=area_width){Á.container.Ç.width=area_width+\"px\";Á.Â.Ç.width=area_width+\"px\";Á.content_highlight.Ç.width=area_width+\"px\";Á.Â.previous_scrollWidth=area_width;resized=Ë;}}if(Á.Å['word_wrap']){newW=Á.Â.offsetWidth;if(Á.isFirefox||Á.isIE)newW-=2;if(Á.isSafari)newW-=6;Á.content_highlight.Ç.width=Á.selection_field_text.Ç.width=Á.selection_field.Ç.width=Á.test_font_size.Ç.width=newW+\"px\";}if(Á.isOpera||Á.isFirefox||Á.isSafari){area_height=Á.getLinePosTop(Á.É[\"nb_line\"]+1);}\nelse{area_height=Á.Â.scrollHeight;}if(Á.Â.previous_scrollHeight!=area_height){Á.container.Ç.height=(area_height+2)+\"px\";Á.Â.Ç.height=area_height+\"px\";Á.content_highlight.Ç.height=area_height+\"px\";Á.Â.previous_scrollHeight=area_height;resized=Ë;}if(Á.É[\"nb_line\"] >=Á.line_number){var newLines='',destDiv=_$(\"line_number\"),start=Á.line_number,end=Á.É[\"nb_line\"]+100;for(i=start+1;i < end;i++){newLines+='<div id=\"line_'+i+'\">'+i+\"</div>\";Á.line_number++;}destDiv.innerHTML=destDiv.innerHTML+newLines;Á.fixLinesHeight(Á.Â.Ê,start,-1);}Á.Â.scrollTop=\"0px\";Á.Â.scrollLeft=\"0px\";if(resized==Ë){Á.scroll_to_view();}}if(!onlyOneTime)setTimeout(\"eA.manage_size();\",100);};EA.Ä.execCommand=Ã(cmd,param){for(var i in Á.plugins){if(typeof(Á.plugins[i].execCommand)==\"Ã\"){if(!Á.plugins[i].execCommand(cmd,param))return;}}switch(cmd){case \"save\":if(Á.Å[\"save_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"save_callback\"]+\"('\"+Á.id+\"',eA.Â.Ê);\");break;case \"load\":if(Á.Å[\"load_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"load_callback\"]+\"('\"+Á.id+\"');\");break;case \"onchange\":if(Á.Å[\"change_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"change_callback\"]+\"('\"+Á.id+\"');\");break;case \"EA_load\":if(Á.Å[\"EA_load_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"EA_load_callback\"]+\"('\"+Á.id+\"');\");break;case \"EA_unload\":if(Á.Å[\"EA_unload_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"EA_unload_callback\"]+\"('\"+Á.id+\"');\");break;case \"toggle_on\":if(Á.Å[\"EA_toggle_on_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"EA_toggle_on_callback\"]+\"('\"+Á.id+\"');\");break;case \"toggle_off\":if(Á.Å[\"EA_toggle_off_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"EA_toggle_off_callback\"]+\"('\"+Á.id+\"');\");break;case \"re_sync\":if(!Á.do_highlight)break;case \"file_switch_on\":if(Á.Å[\"EA_file_switch_on_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"EA_file_switch_on_callback\"]+\"(param);\");break;case \"file_switch_off\":if(Á.Å[\"EA_file_switch_off_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"EA_file_switch_off_callback\"]+\"(param);\");break;case \"file_close\":if(Á.Å[\"EA_file_close_callback\"].Æ>0)return eval(\"È.\"+Á.Å[\"EA_file_close_callback\"]+\"(param);\");break;default:if(typeof(eval(\"eA.\"+cmd))==\"Ã\"){if(Á.Å[\"debug\"])eval(\"eA.\"+cmd+\"(param);\");\nelse try{eval(\"eA.\"+cmd+\"(param);\");}catch(e){};}}};EA.Ä.get_translation=Ã(word,mode){if(mode==\"template\")return È.eAL.translate(word,Á.Å[\"language\"],mode);\nelse return È.eAL.get_word_translation(word,Á.Å[\"language\"]);};EA.Ä.add_plugin=Ã(plug_name,plug_obj){for(var i=0;i<Á.Å[\"plugins\"].Æ;i++){if(Á.Å[\"plugins\"][i]==plug_name){Á.plugins[plug_name]=plug_obj;plug_obj.baseURL=È.eAL.baseURL+\"plugins/\"+plug_name+\"/\";if(typeof(plug_obj.init)==\"Ã\")plug_obj.init();}}};EA.Ä.load_css=Ã(url){try{link=document.createElement(\"link\");link.type=\"text/css\";link.rel=\"Çsheet\";link.media=\"all\";link.href=url;head=document.getElementsByTagName(\"head\");head[0].appendChild(link);}catch(e){document.write(\"<link href='\"+url+\"' rel='Çsheet' type='text/css' />\");}};EA.Ä.load_script=Ã(url){try{script=document.createElement(\"script\");script.type=\"text/javascript\";script.src=url;script.charset=\"UTF-8\";head=document.getElementsByTagName(\"head\");head[0].appendChild(script);}catch(e){document.write(\"<script type='text/javascript' src='\"+url+\"' charset=\\\"UTF-8\\\"><\"+\"/script>\");}};EA.Ä.add_lang=Ã(language,Ês){if(!È.eAL.lang[language])È.eAL.lang[language]={};for(var i in Ês)È.eAL.lang[language][i]=Ês[i];};Ã _$(id){return document.getElementById(id);};var eA=new EA();È.eAL.add_event(window,\"load\",init);Ã init(){setTimeout(\"eA.init();\",10);};	EA.Ä.focus=Ã(){Á.Â.focus();Á.ÂFocused=Ë;};EA.Ä.check_line_selection=Ã(timer_checkup){var changes,infos,new_top,new_width,i;var t1=t2=t2_1=t3=tLines=tend=new Date().getTime();if(!eAs[Á.id])return Ì;if(!Á.smooth_selection&&!Á.do_highlight){}\nelse if(Á.ÂFocused&&eAs[Á.id][\"displayed\"]==Ë&&Á.isResizing==Ì){infos=Á.get_selection_infos();changes=Á.checkTextEvolution(typeof(Á.É['full_text'])=='undefined' ? '':Á.É['full_text'],infos['full_text']);t2=new Date().getTime();if(Á.É[\"line_start\"] !=infos[\"line_start\"]||Á.É[\"line_nb\"] !=infos[\"line_nb\"]||infos[\"full_text\"] !=Á.É[\"full_text\"]||Á.reload_highlight||Á.É[\"selectionStart\"] !=infos[\"selectionStart\"]||Á.É[\"selectionEnd\"] !=infos[\"selectionEnd\"]||!timer_checkup){new_top=Á.getLinePosTop(infos[\"line_start\"]);new_width=Math.max(Á.Â.scrollWidth,Á.container.clientWidth-50);Á.selection_field.Ç.top=Á.selection_field_text.Ç.top=new_top+\"px\";if(!Á.Å['word_wrap']){Á.selection_field.Ç.width=Á.selection_field_text.Ç.width=Á.test_font_size.Ç.width=new_width+\"px\";}if(Á.do_highlight==Ë){var curr_text=infos[\"full_text\"].split(\"\\n\");var content=\"\";var start=Math.max(0,infos[\"line_start\"]-1);var end=Math.min(curr_text.Æ,infos[\"line_start\"]+infos[\"line_nb\"]-1);for(i=start;i< end;i++){content+=curr_text[i]+\"\\n\";}selLength=infos['selectionEnd']-infos['selectionStart'];content=content.substr(0,infos[\"curr_pos\"]-1)+\"\\r\\r\"+content.substr(infos[\"curr_pos\"]-1,selLength)+\"\\r\\r\"+content.substr(infos[\"curr_pos\"]-1+selLength);content='<span>'+content.replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\").replace(/>/g,\"&gt;\").replace(\"\\r\\r\",'</span><strong>').replace(\"\\r\\r\",'</strong><span>')+'</span>';if(Á.isIE||(Á.isOpera&&Á.isOpera < 9.6)){Á.selection_field.innerHTML=\"<pre>\"+content.replace(/^\\r?\\n/,\"<br/>\")+\"</pre>\";}\nelse{Á.selection_field.innerHTML=content;}Á.selection_field_text.innerHTML=Á.selection_field.innerHTML;t2_1=new Date().getTime();if(Á.reload_highlight||(infos[\"full_text\"] !=Á.last_text_to_highlight&&(Á.É[\"line_start\"]!=infos[\"line_start\"]||Á.show_line_colors||Á.Å['word_wrap']||Á.É[\"line_nb\"]!=infos[\"line_nb\"]||Á.É[\"nb_line\"]!=infos[\"nb_line\"]))){Á.maj_highlight(infos);}}}t3=new Date().getTime();if(Á.Å['word_wrap']&&infos[\"full_text\"] !=Á.É[\"full_text\"]){if(changes.newText.split(\"\\n\").Æ==1&&Á.É['nb_line']&&infos['nb_line']==Á.É['nb_line']){Á.fixLinesHeight(infos['full_text'],changes.lineStart,changes.lineStart);}\nelse{Á.fixLinesHeight(infos['full_text'],changes.lineStart,-1);}}tLines=new Date().getTime();if(infos[\"line_start\"] !=Á.É[\"line_start\"]||infos[\"curr_pos\"] !=Á.É[\"curr_pos\"]||infos[\"full_text\"].Æ!=Á.É[\"full_text\"].Æ||Á.reload_highlight||!timer_checkup){var selec_char=infos[\"curr_line\"].charAt(infos[\"curr_pos\"]-1);var no_real_move=Ë;if(infos[\"line_nb\"]==1&&(Á.assocBracket[selec_char]||Á.revertAssocBracket[selec_char])){no_real_move=Ì;if(Á.findEndBracket(infos,selec_char)===Ë){_$(\"end_bracket\").Ç.visibility=\"visible\";_$(\"cursor_pos\").Ç.visibility=\"visible\";_$(\"cursor_pos\").innerHTML=selec_char;_$(\"end_bracket\").innerHTML=(Á.assocBracket[selec_char]||Á.revertAssocBracket[selec_char]);}\nelse{_$(\"end_bracket\").Ç.visibility=\"hidden\";_$(\"cursor_pos\").Ç.visibility=\"hidden\";}}\nelse{_$(\"cursor_pos\").Ç.visibility=\"hidden\";_$(\"end_bracket\").Ç.visibility=\"hidden\";}Á.displayToCursorPosition(\"cursor_pos\",infos[\"line_start\"],infos[\"curr_pos\"]-1,infos[\"curr_line\"],no_real_move);if(infos[\"line_nb\"]==1&&infos[\"line_start\"]!=Á.É[\"line_start\"])Á.scroll_to_view();}Á.É=infos;}tend=new Date().getTime();if(timer_checkup){setTimeout(\"eA.check_line_selection(Ë)\",Á.check_line_selection_timer);}};EA.Ä.get_selection_infos=Ã(){var sel={},start,end,len,str;Á.getIESelection();start=Á.Â.selectionStart;end=Á.Â.selectionEnd;if(Á.É[\"selectionStart\"]==start&&Á.É[\"selectionEnd\"]==end&&Á.É[\"full_text\"]==Á.Â.Ê){return Á.É;}if(Á.tabulation!=\"\t\"&&Á.Â.Ê.indexOf(\"\t\")!=-1){len=Á.Â.Ê.Æ;Á.Â.Ê=Á.replace_tab(Á.Â.Ê);start=end=start+(Á.Â.Ê.Æ-len);Á.area_select(start,0);}sel[\"selectionStart\"]=start;sel[\"selectionEnd\"]=end;sel[\"full_text\"]=Á.Â.Ê;sel[\"line_start\"]=1;sel[\"line_nb\"]=1;sel[\"curr_pos\"]=0;sel[\"curr_line\"]=\"\";sel[\"indexOfCursor\"]=0;sel[\"selec_direction\"]=Á.É[\"selec_direction\"];var splitTab=sel[\"full_text\"].split(\"\\n\");var nbLine=Math.max(0,splitTab.Æ);var nbChar=Math.max(0,sel[\"full_text\"].Æ-(nbLine-1));if(sel[\"full_text\"].indexOf(\"\\r\")!=-1)nbChar=nbChar-(nbLine-1);sel[\"nb_line\"]=nbLine;sel[\"nb_char\"]=nbChar;if(start>0){str=sel[\"full_text\"].substr(0,start);sel[\"curr_pos\"]=start-str.lastIndexOf(\"\\n\");sel[\"line_start\"]=Math.max(1,str.split(\"\\n\").Æ);}\nelse{sel[\"curr_pos\"]=1;}if(end>start){sel[\"line_nb\"]=sel[\"full_text\"].substring(start,end).split(\"\\n\").Æ;}sel[\"indexOfCursor\"]=start;sel[\"curr_line\"]=splitTab[Math.max(0,sel[\"line_start\"]-1)];if(sel[\"selectionStart\"]==Á.É[\"selectionStart\"]){if(sel[\"selectionEnd\"]>Á.É[\"selectionEnd\"])sel[\"selec_direction\"]=\"down\";\nelse if(sel[\"selectionEnd\"]==Á.É[\"selectionStart\"])sel[\"selec_direction\"]=Á.É[\"selec_direction\"];}\nelse if(sel[\"selectionStart\"]==Á.É[\"selectionEnd\"]&&sel[\"selectionEnd\"]>Á.É[\"selectionEnd\"]){sel[\"selec_direction\"]=\"down\";}\nelse{sel[\"selec_direction\"]=\"up\";}_$(\"nbLine\").innerHTML=nbLine;_$(\"nbChar\").innerHTML=nbChar;_$(\"linePos\").innerHTML=sel[\"line_start\"];_$(\"currPos\").innerHTML=sel[\"curr_pos\"];return sel;};EA.Ä.getIESelection=Ã(){var selectionStart,selectionEnd,range,stored_range;if(!Á.isIE)return Ì;if(Á.Å['word_wrap'])Á.Â.wrap='off';try{range=document.selection.createRange();stored_range=range.duplicate();stored_range.moveToElementText(Á.Â);stored_range.setEndPoint('EndToEnd',range);if(stored_range.ÈElement()!=Á.Â)throw \"invalid focus\";var scrollTop=Á.result.scrollTop+document.body.scrollTop;var relative_top=range.offsetTop-È.calculeOffsetTop(Á.Â)+scrollTop;var line_start=Math.round((relative_top / Á.lineHeight)+1);var line_nb=Math.round(range.boundingHeight / Á.lineHeight);selectionStart=stored_range.text.Æ-range.text.Æ;selectionStart+=(line_start-Á.Â.Ê.substr(0,selectionStart).split(\"\\n\").Æ)*2;selectionStart-=(line_start-Á.Â.Ê.substr(0,selectionStart).split(\"\\n\").Æ)* 2;selectionEnd=selectionStart+range.text.Æ;selectionEnd+=(line_start+line_nb-1-Á.Â.Ê.substr(0,selectionEnd).split(\"\\n\").Æ)*2;Á.Â.selectionStart=selectionStart;Á.Â.selectionEnd=selectionEnd;}catch(e){}if(Á.Å['word_wrap'])Á.Â.wrap='soft';};EA.Ä.setIESelection=Ã(){var a=Á.Â,nbLineStart,nbLineEnd,range;if(!Á.isIE)return Ì;nbLineStart=a.Ê.substr(0,a.selectionStart).split(\"\\n\").Æ-1;nbLineEnd=a.Ê.substr(0,a.selectionEnd).split(\"\\n\").Æ-1;range=document.selection.createRange();range.moveToElementText(a);range.setEndPoint('EndToStart',range);range.moveStart('character',a.selectionStart-nbLineStart);range.moveEnd('character',a.selectionEnd-nbLineEnd-(a.selectionStart-nbLineStart));range.select();};EA.Ä.checkTextEvolution=Ã(lastText,newText){var ch={},baseStep=200,cpt=0,end,step,tStart=new Date().getTime();end=Math.min(newText.Æ,lastText.Æ);step=baseStep;while(cpt<end&&step>=1){if(lastText.substr(cpt,step)==newText.substr(cpt,step)){cpt+=step;}\nelse{step=Math.floor(step/2);}}ch.posStart=cpt;ch.lineStart=newText.substr(0,ch.posStart).split(\"\\n\").Æ-1;cpt_last=lastText.Æ;cpt=newText.Æ;step=baseStep;while(cpt>=0&&cpt_last>=0&&step>=1){if(lastText.substr(cpt_last-step,step)==newText.substr(cpt-step,step)){cpt-=step;cpt_last-=step;}\nelse{step=Math.floor(step/2);}}ch.posNewEnd=cpt;ch.posLastEnd=cpt_last;if(ch.posNewEnd<=ch.posStart){if(lastText.Æ < newText.Æ){ch.posNewEnd=ch.posStart+newText.Æ-lastText.Æ;ch.posLastEnd=ch.posStart;}\nelse{ch.posLastEnd=ch.posStart+lastText.Æ-newText.Æ;ch.posNewEnd=ch.posStart;}}ch.newText=newText.substring(ch.posStart,ch.posNewEnd);ch.lastText=lastText.substring(ch.posStart,ch.posLastEnd);ch.lineNewEnd=newText.substr(0,ch.posNewEnd).split(\"\\n\").Æ-1;ch.lineLastEnd=lastText.substr(0,ch.posLastEnd).split(\"\\n\").Æ-1;ch.newTextLine=newText.split(\"\\n\").slice(ch.lineStart,ch.lineNewEnd+1).join(\"\\n\");ch.lastTextLine=lastText.split(\"\\n\").slice(ch.lineStart,ch.lineLastEnd+1).join(\"\\n\");return ch;};EA.Ä.tab_selection=Ã(){if(Á.is_tabbing)return;Á.is_tabbing=Ë;Á.getIESelection();var start=Á.Â.selectionStart;var end=Á.Â.selectionEnd;var insText=Á.Â.Ê.substring(start,end);var pos_start=start;var pos_end=end;if(insText.Æ==0){Á.Â.Ê=Á.Â.Ê.substr(0,start)+Á.tabulation+Á.Â.Ê.substr(end);pos_start=start+Á.tabulation.Æ;pos_end=pos_start;}\nelse{start=Math.max(0,Á.Â.Ê.substr(0,start).lastIndexOf(\"\\n\")+1);endText=Á.Â.Ê.substr(end);startText=Á.Â.Ê.substr(0,start);tmp=Á.Â.Ê.substring(start,end).split(\"\\n\");insText=Á.tabulation+tmp.join(\"\\n\"+Á.tabulation);Á.Â.Ê=startText+insText+endText;pos_start=start;pos_end=Á.Â.Ê.indexOf(\"\\n\",startText.Æ+insText.Æ);if(pos_end==-1)pos_end=Á.Â.Ê.Æ;}Á.Â.selectionStart=pos_start;Á.Â.selectionEnd=pos_end;if(Á.isIE){Á.setIESelection();setTimeout(\"eA.is_tabbing=Ì;\",100);}\nelse{Á.is_tabbing=Ì;}};EA.Ä.invert_tab_selection=Ã(){var t=Á,a=Á.Â;if(t.is_tabbing)return;t.is_tabbing=Ë;t.getIESelection();var start=a.selectionStart;var end=a.selectionEnd;var insText=a.Ê.substring(start,end);var pos_start=start;var pos_end=end;if(insText.Æ==0){if(a.Ê.substring(start-t.tabulation.Æ,start)==t.tabulation){a.Ê=a.Ê.substr(0,start-t.tabulation.Æ)+a.Ê.substr(end);pos_start=Math.max(0,start-t.tabulation.Æ);pos_end=pos_start;}}\nelse{start=a.Ê.substr(0,start).lastIndexOf(\"\\n\")+1;endText=a.Ê.substr(end);startText=a.Ê.substr(0,start);tmp=a.Ê.substring(start,end).split(\"\\n\");insText=\"\";for(i=0;i<tmp.Æ;i++){for(j=0;j<t.tab_nb_char;j++){if(tmp[i].charAt(0)==\"\t\"){tmp[i]=tmp[i].substr(1);j=t.tab_nb_char;}\nelse if(tmp[i].charAt(0)==\" \")tmp[i]=tmp[i].substr(1);}insText+=tmp[i];if(i<tmp.Æ-1)insText+=\"\\n\";}a.Ê=startText+insText+endText;pos_start=start;pos_end=a.Ê.indexOf(\"\\n\",startText.Æ+insText.Æ);if(pos_end==-1)pos_end=a.Ê.Æ;}a.selectionStart=pos_start;a.selectionEnd=pos_end;if(t.isIE){t.setIESelection();setTimeout(\"eA.is_tabbing=Ì;\",100);}\nelse t.is_tabbing=Ì;};EA.Ä.press_enter=Ã(){if(!Á.smooth_selection)return Ì;Á.getIESelection();var scrollTop=Á.result.scrollTop;var scrollLeft=Á.result.scrollLeft;var start=Á.Â.selectionStart;var end=Á.Â.selectionEnd;var start_last_line=Math.max(0,Á.Â.Ê.substring(0,start).lastIndexOf(\"\\n\")+1);var begin_line=Á.Â.Ê.substring(start_last_line,start).replace(/^([ \t]*).*/gm,\"$1\");var lineStart=Á.Â.Ê.substring(0,start).split(\"\\n\").Æ;if(begin_line==\"\\n\"||begin_line==\"\\r\"||begin_line.Æ==0){return Ì;}if(Á.isIE||(Á.isOpera&&Á.isOpera < 9.6)){begin_line=\"\\r\\n\"+begin_line;}\nelse{begin_line=\"\\n\"+begin_line;}Á.Â.Ê=Á.Â.Ê.substring(0,start)+begin_line+Á.Â.Ê.substring(end);Á.area_select(start+begin_line.Æ,0);if(Á.isIE){Á.result.scrollTop=scrollTop;Á.result.scrollLeft=scrollLeft;}return Ë;};EA.Ä.findEndBracket=Ã(infos,bracket){var start=infos[\"indexOfCursor\"];var normal_order=Ë;if(Á.assocBracket[bracket])endBracket=Á.assocBracket[bracket];\nelse if(Á.revertAssocBracket[bracket]){endBracket=Á.revertAssocBracket[bracket];normal_order=Ì;}var end=-1;var nbBracketOpen=0;for(var i=start;i<infos[\"full_text\"].Æ&&i>=0;){if(infos[\"full_text\"].charAt(i)==endBracket){nbBracketOpen--;if(nbBracketOpen<=0){end=i;break;}}\nelse if(infos[\"full_text\"].charAt(i)==bracket)nbBracketOpen++;if(normal_order)i++;\nelse i--;}if(end==-1)return Ì;var endLastLine=infos[\"full_text\"].substr(0,end).lastIndexOf(\"\\n\");if(endLastLine==-1)line=1;\nelse line=infos[\"full_text\"].substr(0,endLastLine).split(\"\\n\").Æ+1;var curPos=end-endLastLine-1;var endLineLength=infos[\"full_text\"].substring(end).split(\"\\n\")[0].Æ;Á.displayToCursorPosition(\"end_bracket\",line,curPos,infos[\"full_text\"].substring(endLastLine+1,end+endLineLength));return Ë;};EA.Ä.displayToCursorPosition=Ã(id,start_line,cur_pos,lineContent,no_real_move){var elem,dest,content,posLeft=0,posTop,fixPadding,topOffset,endElem;elem=Á.test_font_size;dest=_$(id);content=\"<span id='test_font_size_inner'>\"+lineContent.substr(0,cur_pos).replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\")+\"</span><span id='endTestFont'>\"+lineContent.substr(cur_pos).replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\")+\"</span>\";if(Á.isIE||(Á.isOpera&&Á.isOpera < 9.6)){elem.innerHTML=\"<pre>\"+content.replace(/^\\r?\\n/,\"<br/>\")+\"</pre>\";}\nelse{elem.innerHTML=content;}endElem=_$('endTestFont');topOffset=endElem.offsetTop;fixPadding=parseInt(Á.content_highlight.Ç.paddingLeft.replace(\"px\",\"\"));posLeft=45+endElem.offsetLeft+(!isNaN(fixPadding)&&topOffset > 0 ? fixPadding:0);posTop=Á.getLinePosTop(start_line)+topOffset;if(Á.isIE&&cur_pos > 0&&endElem.offsetLeft==0){posTop+=Á.lineHeight;}if(no_real_move!=Ë){dest.Ç.top=posTop+\"px\";dest.Ç.left=posLeft+\"px\";}dest.cursor_top=posTop;dest.cursor_left=posLeft;};EA.Ä.getLinePosTop=Ã(start_line){var elem=_$('line_'+start_line),posTop=0;if(elem)posTop=elem.offsetTop;\nelse posTop=Á.lineHeight *(start_line-1);return posTop;};EA.Ä.getTextHeight=Ã(text){var t=Á,elem,height;elem=t.test_font_size;content=text.replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\");if(t.isIE||(Á.isOpera&&Á.isOpera < 9.6)){elem.innerHTML=\"<pre>\"+content.replace(/^\\r?\\n/,\"<br/>\")+\"</pre>\";}\nelse{elem.innerHTML=content;}height=elem.offsetHeight;height=Math.max(1,Math.floor(elem.offsetHeight / Á.lineHeight))* Á.lineHeight;return height;};EA.Ä.fixLinesHeight=Ã(textValue,lineStart,lineEnd){var aText=textValue.split(\"\\n\");if(lineEnd==-1)lineEnd=aText.Æ-1;for(var i=Math.max(0,lineStart);i <=lineEnd;i++){if(elem=_$('line_'+(i+1))){elem.Ç.height=typeof(aText[i])!=\"undefined\" ? Á.getTextHeight(aText[i])+\"px\":Á.lineHeight;}}};EA.Ä.area_select=Ã(start,Æ){Á.Â.focus();start=Math.max(0,Math.min(Á.Â.Ê.Æ,start));end=Math.max(start,Math.min(Á.Â.Ê.Æ,start+Æ));if(Á.isIE){Á.Â.selectionStart=start;Á.Â.selectionEnd=end;Á.setIESelection();}\nelse{if(Á.isOpera&&Á.isOpera < 9.6){Á.Â.setSelectionRange(0,0);}Á.Â.setSelectionRange(start,end);}Á.check_line_selection();};EA.Ä.area_get_selection=Ã(){var text=\"\";if(document.selection){var range=document.selection.createRange();text=range.text;}\nelse{text=Á.Â.Ê.substring(Á.Â.selectionStart,Á.Â.selectionEnd);}return text;}; EA.Ä.replace_tab=Ã(text){return text.replace(/((\\n?)([^\t\\n]*)\t)/gi,eA.smartTab);};EA.Ä.smartTab=Ã(){val=\"                   \";return EA.Ä.smartTab.arguments[2]+EA.Ä.smartTab.arguments[3]+val.substr(0,eA.tab_nb_char-(EA.Ä.smartTab.arguments[3].Æ)%eA.tab_nb_char);};EA.Ä.show_waiting_screen=Ã(){width=Á.editor_area.offsetWidth;height=Á.editor_area.offsetHeight;if(!(Á.isIE&&Á.isIE<6)){width-=2;height-=2;}Á.processing_screen.Ç.display=\"block\";Á.processing_screen.Ç.width=width+\"px\";Á.processing_screen.Ç.height=height+\"px\";Á.waiting_screen_displayed=Ë;};EA.Ä.hide_waiting_screen=Ã(){Á.processing_screen.Ç.display=\"none\";Á.waiting_screen_displayed=Ì;};EA.Ä.add_Ç=Ã(Çs){if(Çs.Æ>0){newcss=document.createElement(\"Ç\");newcss.type=\"text/css\";newcss.media=\"all\";if(newcss.ÇSheet){newcss.ÇSheet.cssText=Çs;}\nelse{newcss.appendChild(document.createTextNode(Çs));}document.getElementsByTagName(\"head\")[0].appendChild(newcss);}};EA.Ä.set_font=Ã(family,size){var t=Á,a=Á.Â,s=Á.Å,elem_font,i,elem;var elems=[\"Â\",\"content_highlight\",\"cursor_pos\",\"end_bracket\",\"selection_field\",\"selection_field_text\",\"line_number\"];if(family&&family!=\"\")s[\"font_family\"]=family;if(size&&size>0)s[\"font_size\"]=size;if(t.isOpera&&t.isOpera < 9.6)s['font_family']=\"monospace\";if(elem_font=_$(\"area_font_size\")){for(i=0;i < elem_font.Æ;i++){if(elem_font.options[i].Ê&&elem_font.options[i].Ê==s[\"font_size\"])elem_font.options[i].selected=Ë;}}if(t.isFirefox){var nbTry=3;do{var div1=document.createElement('div'),text1=document.createElement('Â');var Çs={width:'40px',overflow:'scroll',zIndex:50,visibility:'hidden',fontFamily:s[\"font_family\"],fontSize:s[\"font_size\"]+\"pt\",lineHeight:t.lineHeight+\"px\",padding:'0',margin:'0',border:'none',whiteSpace:'nowrap'};var diff,changed=Ì;for(i in Çs){div1.Ç[ i ]=Çs[i];text1.Ç[ i ]=Çs[i];}text1.wrap='off';text1.setAttribute('wrap','off');t.container.appendChild(div1);t.container.appendChild(text1);div1.innerHTML=text1.Ê='azertyuiopqsdfghjklm';div1.innerHTML=text1.Ê=text1.Ê+'wxcvbn^p*ù$!:;,,';diff=text1.scrollWidth-div1.scrollWidth;if(Math.abs(diff)>=2){s[\"font_size\"]++;changed=Ë;}t.container.removeChild(div1);t.container.removeChild(text1);nbTry--;}while(changed&&nbTry > 0);}elem=t.test_font_size;elem.Ç.fontFamily=\"\"+s[\"font_family\"];elem.Ç.fontSize=s[\"font_size\"]+\"pt\";elem.innerHTML=\"0\";t.lineHeight=elem.offsetHeight;for(i=0;i<elems.Æ;i++){elem=_$(elems[i]);elem.Ç.fontFamily=s[\"font_family\"];elem.Ç.fontSize=s[\"font_size\"]+\"pt\";elem.Ç.lineHeight=t.lineHeight+\"px\";}t.add_Ç(\"pre{font-family:\"+s[\"font_family\"]+\"}\");if((t.isOpera&&t.isOpera < 9.6)||t.isIE >=8){var parNod=a.ÈNode,nxtSib=a.nextSibling,start=a.selectionStart,end=a.selectionEnd;parNod.removeChild(a);parNod.insertBefore(a,nxtSib);t.area_select(start,end-start);}Á.focus();Á.update_size();Á.check_line_selection();};EA.Ä.change_font_size=Ã(){var size=_$(\"area_font_size\").Ê;if(size>0)Á.set_font(\"\",size);};EA.Ä.open_inline_popup=Ã(popup_id){Á.close_all_inline_popup();var popup=_$(popup_id);var editor=_$(\"editor\");for(var i=0;i<Á.inlinePopup.Æ;i++){if(Á.inlinePopup[i][\"popup_id\"]==popup_id){var icon=_$(Á.inlinePopup[i][\"icon_id\"]);if(icon){Á.switchClassSticky(icon,'editAreaButtonSelected',Ë);break;}}}popup.Ç.height=\"auto\";popup.Ç.overflow=\"visible\";if(document.body.offsetHeight< popup.offsetHeight){popup.Ç.height=(document.body.offsetHeight-10)+\"px\";popup.Ç.overflow=\"auto\";}if(!popup.positionned){var new_left=editor.offsetWidth /2-popup.offsetWidth /2;var new_top=editor.offsetHeight /2-popup.offsetHeight /2;popup.Ç.left=new_left+\"px\";popup.Ç.top=new_top+\"px\";popup.positionned=Ë;}popup.Ç.visibility=\"visible\";};EA.Ä.close_inline_popup=Ã(popup_id){var popup=_$(popup_id);for(var i=0;i<Á.inlinePopup.Æ;i++){if(Á.inlinePopup[i][\"popup_id\"]==popup_id){var icon=_$(Á.inlinePopup[i][\"icon_id\"]);if(icon){Á.switchClassSticky(icon,'editAreaButtonNormal',Ì);break;}}}popup.Ç.visibility=\"hidden\";};EA.Ä.close_all_inline_popup=Ã(e){for(var i=0;i<Á.inlinePopup.Æ;i++){Á.close_inline_popup(Á.inlinePopup[i][\"popup_id\"]);}Á.Â.focus();};EA.Ä.show_help=Ã(){Á.open_inline_popup(\"edit_area_help\");};EA.Ä.new_document=Ã(){Á.Â.Ê=\"\";Á.area_select(0,0);};EA.Ä.get_all_toolbar_height=Ã(){var area=_$(\"editor\");var results=È.getChildren(area,\"div\",\"class\",\"area_toolbar\",\"all\",\"0\");var height=0;for(var i=0;i<results.Æ;i++){height+=results[i].offsetHeight;}return height;};EA.Ä.go_to_line=Ã(line){if(!line){var icon=_$(\"go_to_line\");if(icon !=null){Á.restoreClass(icon);Á.switchClassSticky(icon,'editAreaButtonSelected',Ë);}line=prompt(Á.get_translation(\"go_to_line_prompt\"));if(icon !=null)Á.switchClassSticky(icon,'editAreaButtonNormal',Ì);}if(line&&line!=null&&line.search(/^[0-9]+$/)!=-1){var start=0;var lines=Á.Â.Ê.split(\"\\n\");if(line > lines.Æ)start=Á.Â.Ê.Æ;\nelse{for(var i=0;i<Math.min(line-1,lines.Æ);i++)start+=lines[i].Æ+1;}Á.area_select(start,0);}};EA.Ä.change_smooth_selection_mode=Ã(setTo){if(Á.do_highlight)return;if(setTo !=null){if(setTo===Ì)Á.smooth_selection=Ë;\nelse Á.smooth_selection=Ì;}var icon=_$(\"change_smooth_selection\");Á.Â.focus();if(Á.smooth_selection===Ë){Á.switchClassSticky(icon,'editAreaButtonNormal',Ì);Á.smooth_selection=Ì;Á.selection_field.Ç.display=\"none\";_$(\"cursor_pos\").Ç.display=\"none\";_$(\"end_bracket\").Ç.display=\"none\";}\nelse{Á.switchClassSticky(icon,'editAreaButtonSelected',Ì);Á.smooth_selection=Ë;Á.selection_field.Ç.display=\"block\";_$(\"cursor_pos\").Ç.display=\"block\";_$(\"end_bracket\").Ç.display=\"block\";}};EA.Ä.scroll_to_view=Ã(show){var zone,lineElem;if(!Á.smooth_selection)return;zone=_$(\"result\");var cursor_pos_top=_$(\"cursor_pos\").cursor_top;if(show==\"bottom\"){cursor_pos_top+=Á.getLinePosTop(Á.É['line_start']+Á.É['line_nb']-1);}var max_height_visible=zone.clientHeight+zone.scrollTop;var miss_top=cursor_pos_top+Á.lineHeight-max_height_visible;if(miss_top>0){zone.scrollTop=zone.scrollTop+miss_top;}\nelse if(zone.scrollTop > cursor_pos_top){zone.scrollTop=cursor_pos_top;}var cursor_pos_left=_$(\"cursor_pos\").cursor_left;var max_width_visible=zone.clientWidth+zone.scrollLeft;var miss_left=cursor_pos_left+10-max_width_visible;if(miss_left>0){zone.scrollLeft=zone.scrollLeft+miss_left+50;}\nelse if(zone.scrollLeft > cursor_pos_left){zone.scrollLeft=cursor_pos_left;}\nelse if(zone.scrollLeft==45){zone.scrollLeft=0;}};EA.Ä.check_undo=Ã(only_once){if(!eAs[Á.id])return Ì;if(Á.ÂFocused&&eAs[Á.id][\"displayed\"]==Ë){var text=Á.Â.Ê;if(Á.previous.Æ<=1)Á.switchClassSticky(_$(\"undo\"),'editAreaButtonDisabled',Ë);if(!Á.previous[Á.previous.Æ-1]||Á.previous[Á.previous.Æ-1][\"text\"] !=text){Á.previous.push({\"text\":text,\"selStart\":Á.Â.selectionStart,\"selEnd\":Á.Â.selectionEnd});if(Á.previous.Æ > Á.Å[\"max_undo\"]+1)Á.previous.shift();}if(Á.previous.Æ >=2)Á.switchClassSticky(_$(\"undo\"),'editAreaButtonNormal',Ì);}if(!only_once)setTimeout(\"eA.check_undo()\",3000);};EA.Ä.undo=Ã(){if(Á.previous.Æ > 0){Á.getIESelection();Á.next.push({\"text\":Á.Â.Ê,\"selStart\":Á.Â.selectionStart,\"selEnd\":Á.Â.selectionEnd});var prev=Á.previous.pop();if(prev[\"text\"]==Á.Â.Ê&&Á.previous.Æ > 0)prev=Á.previous.pop();Á.Â.Ê=prev[\"text\"];Á.last_undo=prev[\"text\"];Á.area_select(prev[\"selStart\"],prev[\"selEnd\"]-prev[\"selStart\"]);Á.switchClassSticky(_$(\"redo\"),'editAreaButtonNormal',Ì);Á.resync_highlight(Ë);Á.check_file_changes();}};EA.Ä.redo=Ã(){if(Á.next.Æ > 0){var next=Á.next.pop();Á.previous.push(next);Á.Â.Ê=next[\"text\"];Á.last_undo=next[\"text\"];Á.area_select(next[\"selStart\"],next[\"selEnd\"]-next[\"selStart\"]);Á.switchClassSticky(_$(\"undo\"),'editAreaButtonNormal',Ì);Á.resync_highlight(Ë);Á.check_file_changes();}if(Á.next.Æ==0)Á.switchClassSticky(_$(\"redo\"),'editAreaButtonDisabled',Ë);};EA.Ä.check_redo=Ã(){if(eA.next.Æ==0||eA.Â.Ê!=eA.last_undo){eA.next=[];eA.switchClassSticky(_$(\"redo\"),'editAreaButtonDisabled',Ë);}\nelse{Á.switchClassSticky(_$(\"redo\"),'editAreaButtonNormal',Ì);}};EA.Ä.switchClass=Ã(element,class_name,lock_state){var lockChanged=Ì;if(typeof(lock_state)!=\"undefined\"&&element !=null){element.classLock=lock_state;lockChanged=Ë;}if(element !=null&&(lockChanged||!element.classLock)){element.oldClassName=element.className;element.className=class_name;}};EA.Ä.restoreAndSwitchClass=Ã(element,class_name){if(element !=null&&!element.classLock){Á.restoreClass(element);Á.switchClass(element,class_name);}};EA.Ä.restoreClass=Ã(element){if(element !=null&&element.oldClassName&&!element.classLock){element.className=element.oldClassName;element.oldClassName=null;}};EA.Ä.setClassLock=Ã(element,lock_state){if(element !=null)element.classLock=lock_state;};EA.Ä.switchClassSticky=Ã(element,class_name,lock_state){var lockChanged=Ì;if(typeof(lock_state)!=\"undefined\"&&element !=null){element.classLock=lock_state;lockChanged=Ë;}if(element !=null&&(lockChanged||!element.classLock)){element.className=class_name;element.oldClassName=class_name;}};EA.Ä.scroll_page=Ã(params){var dir=params[\"dir\"],shift_pressed=params[\"shift\"];var lines=Á.Â.Ê.split(\"\\n\");var new_pos=0,Æ=0,char_left=0,line_nb=0,curLine=0;var toScrollAmount=_$(\"result\").clientHeight-30;var nbLineToScroll=0,diff=0;if(dir==\"up\"){nbLineToScroll=Math.ceil(toScrollAmount / Á.lineHeight);for(i=Á.É[\"line_start\"];i-diff > Á.É[\"line_start\"]-nbLineToScroll;i--){if(elem=_$('line_'+i)){diff+=Math.floor((elem.offsetHeight-1)/ Á.lineHeight);}}nbLineToScroll-=diff;if(Á.É[\"selec_direction\"]==\"up\"){for(line_nb=0;line_nb< Math.min(Á.É[\"line_start\"]-nbLineToScroll,lines.Æ);line_nb++){new_pos+=lines[line_nb].Æ+1;}char_left=Math.min(lines[Math.min(lines.Æ-1,line_nb)].Æ,Á.É[\"curr_pos\"]-1);if(shift_pressed)Æ=Á.É[\"selectionEnd\"]-new_pos-char_left;Á.area_select(new_pos+char_left,Æ);view=\"top\";}\nelse{view=\"bottom\";for(line_nb=0;line_nb< Math.min(Á.É[\"line_start\"]+Á.É[\"line_nb\"]-1-nbLineToScroll,lines.Æ);line_nb++){new_pos+=lines[line_nb].Æ+1;}char_left=Math.min(lines[Math.min(lines.Æ-1,line_nb)].Æ,Á.É[\"curr_pos\"]-1);if(shift_pressed){start=Math.min(Á.É[\"selectionStart\"],new_pos+char_left);Æ=Math.max(new_pos+char_left,Á.É[\"selectionStart\"])-start;if(new_pos+char_left < Á.É[\"selectionStart\"])view=\"top\";}\nelse start=new_pos+char_left;Á.area_select(start,Æ);}}\nelse{var nbLineToScroll=Math.floor(toScrollAmount / Á.lineHeight);for(i=Á.É[\"line_start\"];i+diff < Á.É[\"line_start\"]+nbLineToScroll;i++){if(elem=_$('line_'+i)){diff+=Math.floor((elem.offsetHeight-1)/ Á.lineHeight);}}nbLineToScroll-=diff;if(Á.É[\"selec_direction\"]==\"down\"){view=\"bottom\";for(line_nb=0;line_nb< Math.min(Á.É[\"line_start\"]+Á.É[\"line_nb\"]-2+nbLineToScroll,lines.Æ);line_nb++){if(line_nb==Á.É[\"line_start\"]-1)char_left=Á.É[\"selectionStart\"]-new_pos;new_pos+=lines[line_nb].Æ+1;}if(shift_pressed){Æ=Math.abs(Á.É[\"selectionStart\"]-new_pos);Æ+=Math.min(lines[Math.min(lines.Æ-1,line_nb)].Æ,Á.É[\"curr_pos\"]);Á.area_select(Math.min(Á.É[\"selectionStart\"],new_pos),Æ);}\nelse{Á.area_select(new_pos+char_left,0);}}\nelse{view=\"top\";for(line_nb=0;line_nb< Math.min(Á.É[\"line_start\"]+nbLineToScroll-1,lines.Æ,lines.Æ);line_nb++){if(line_nb==Á.É[\"line_start\"]-1)char_left=Á.É[\"selectionStart\"]-new_pos;new_pos+=lines[line_nb].Æ+1;}if(shift_pressed){Æ=Math.abs(Á.É[\"selectionEnd\"]-new_pos-char_left);Æ+=Math.min(lines[Math.min(lines.Æ-1,line_nb)].Æ,Á.É[\"curr_pos\"])-char_left-1;Á.area_select(Math.min(Á.É[\"selectionEnd\"],new_pos+char_left),Æ);if(new_pos+char_left > Á.É[\"selectionEnd\"])view=\"bottom\";}\nelse{Á.area_select(new_pos+char_left,0);}}}Á.check_line_selection();Á.scroll_to_view(view);};EA.Ä.start_resize=Ã(e){È.eAL.resize[\"id\"]=eA.id;È.eAL.resize[\"start_x\"]=(e)? e.pageX:event.x+document.body.scrollLeft;È.eAL.resize[\"start_y\"]=(e)? e.pageY:event.y+document.body.scrollTop;if(eA.isIE){eA.Â.focus();eA.getIESelection();}È.eAL.resize[\"selectionStart\"]=eA.Â.selectionStart;È.eAL.resize[\"selectionEnd\"]=eA.Â.selectionEnd;È.eAL.start_resize_area();};EA.Ä.toggle_full_screen=Ã(to){var t=Á,p=È,a=t.Â,html,frame,selStart,selEnd,old,icon;if(typeof(to)==\"undefined\")to=!t.fullscreen['isFull'];old=t.fullscreen['isFull'];t.fullscreen['isFull']=to;icon=_$(\"fullscreen\");selStart=t.Â.selectionStart;selEnd=t.Â.selectionEnd;html=p.document.getElementsByTagName(\"html\")[0];frame=p.document.getElementById(\"frame_\"+t.id);if(to&&to!=old){t.fullscreen['old_overflow']=p.get_css_property(html,\"overflow\");t.fullscreen['old_height']=p.get_css_property(html,\"height\");t.fullscreen['old_width']=p.get_css_property(html,\"width\");t.fullscreen['old_scrollTop']=html.scrollTop;t.fullscreen['old_scrollLeft']=html.scrollLeft;t.fullscreen['old_zIndex']=p.get_css_property(frame,\"z-index\");if(t.isOpera){html.Ç.height=\"100%\";html.Ç.width=\"100%\";}html.Ç.overflow=\"hidden\";html.scrollTop=0;html.scrollLeft=0;frame.Ç.position=\"absolute\";frame.Ç.width=html.clientWidth+\"px\";frame.Ç.height=html.clientHeight+\"px\";frame.Ç.display=\"block\";frame.Ç.zIndex=\"999999\";frame.Ç.top=\"0px\";frame.Ç.left=\"0px\";frame.Ç.top=\"-\"+p.calculeOffsetTop(frame)+\"px\";frame.Ç.left=\"-\"+p.calculeOffsetLeft(frame)+\"px\";t.switchClassSticky(icon,'editAreaButtonSelected',Ì);t.fullscreen['allow_resize']=t.resize_allowed;t.allow_resize(Ì);if(t.isFirefox){p.eAL.execCommand(t.id,\"update_size();\");t.area_select(selStart,selEnd-selStart);t.scroll_to_view();t.focus();}\nelse{setTimeout(\"p.eAL.execCommand('\"+t.id+\"','update_size();');eA.focus();\",10);}}\nelse if(to!=old){frame.Ç.position=\"static\";frame.Ç.zIndex=t.fullscreen['old_zIndex'];if(t.isOpera){html.Ç.height=\"auto\";html.Ç.width=\"auto\";html.Ç.overflow=\"auto\";}\nelse if(t.isIE&&p!=top){html.Ç.overflow=\"auto\";}\nelse{html.Ç.overflow=t.fullscreen['old_overflow'];}html.scrollTop=t.fullscreen['old_scrollTop'];html.scrollLeft=t.fullscreen['old_scrollLeft'];p.eAL.hide(t.id);p.eAL.show(t.id);t.switchClassSticky(icon,'editAreaButtonNormal',Ì);if(t.fullscreen['allow_resize'])t.allow_resize(t.fullscreen['allow_resize']);if(t.isFirefox){t.area_select(selStart,selEnd-selStart);setTimeout(\"eA.scroll_to_view();\",10);}}};EA.Ä.allow_resize=Ã(allow){var resize=_$(\"resize_area\");if(allow){resize.Ç.visibility=\"visible\";È.eAL.add_event(resize,\"mouseup\",eA.start_resize);}\nelse{resize.Ç.visibility=\"hidden\";È.eAL.remove_event(resize,\"mouseup\",eA.start_resize);}Á.resize_allowed=allow;};EA.Ä.change_syntax=Ã(new_syntax,is_waiting){if(new_syntax==Á.Å['syntax'])return Ë;var founded=Ì;for(var i=0;i<Á.syntax_list.Æ;i++){if(Á.syntax_list[i]==new_syntax)founded=Ë;}if(founded==Ë){if(!È.eAL.load_syntax[new_syntax]){if(!is_waiting)È.eAL.load_script(È.eAL.baseURL+\"reg_syntax/\"+new_syntax+\".js\");setTimeout(\"eA.change_syntax('\"+new_syntax+\"',Ë);\",100);Á.show_waiting_screen();}\nelse{if(!Á.allready_used_syntax[new_syntax]){È.eAL.init_syntax_regexp();Á.add_Ç(È.eAL.syntax[new_syntax][\"Çs\"]);Á.allready_used_syntax[new_syntax]=Ë;}var sel=_$(\"syntax_selection\");if(sel&&sel.Ê!=new_syntax){for(var i=0;i<sel.Æ;i++){if(sel.options[i].Ê&&sel.options[i].Ê==new_syntax)sel.options[i].selected=Ë;}}Á.Å['syntax']=new_syntax;Á.resync_highlight(Ë);Á.hide_waiting_screen();return Ë;}}return Ì;};EA.Ä.set_editable=Ã(is_editable){if(is_editable){document.body.className=\"\";Á.Â.readOnly=Ì;Á.is_editable=Ë;}\nelse{document.body.className=\"non_editable\";Á.Â.readOnly=Ë;Á.is_editable=Ì;}if(eAs[Á.id][\"displayed\"]==Ë)Á.update_size();};EA.Ä.toggle_word_wrap=Ã(){Á.set_word_wrap(!Á.Å['word_wrap']);};EA.Ä.set_word_wrap=Ã(to){var t=Á,a=t.Â;if(t.isOpera){Á.Å['word_wrap']=Ì;t.switchClassSticky(_$(\"word_wrap\"),'editAreaButtonDisabled',Ë);return Ì;}if(to){wrap_mode='soft';Á.container.className+=' word_wrap';Á.container.Ç.width=\"\";Á.content_highlight.Ç.width=\"\";a.Ç.width=\"100%\";if(t.isIE&&t.isIE < 7){a.Ç.width=(a.offsetWidth-5)+\"px\";}t.switchClassSticky(_$(\"word_wrap\"),'editAreaButtonSelected',Ì);}\nelse{wrap_mode='off';Á.container.className=Á.container.className.replace(/word_wrap/g,'');t.switchClassSticky(_$(\"word_wrap\"),'editAreaButtonNormal',Ë);}Á.Â.previous_scrollWidth='';Á.Â.previous_scrollHeight='';a.wrap=wrap_mode;a.setAttribute('wrap',wrap_mode);if(!Á.isIE){var start=a.selectionStart,end=a.selectionEnd;var parNod=a.ÈNode,nxtSib=a.nextSibling;parNod.removeChild(a);parNod.insertBefore(a,nxtSib);Á.area_select(start,end-start);}Á.Å['word_wrap']=to;Á.focus();Á.update_size();Á.check_line_selection();};EA.Ä.open_file=Ã(Å){if(Å['id']!=\"undefined\"){var id=Å['id'];var new_file={};new_file['id']=id;new_file['title']=id;new_file['text']=\"\";new_file['É']=\"\";new_file['last_text_to_highlight']=\"\";new_file['last_hightlighted_text']=\"\";new_file['previous']=[];new_file['next']=[];new_file['last_undo']=\"\";new_file['smooth_selection']=Á.Å['smooth_selection'];new_file['do_highlight']=Á.Å['start_highlight'];new_file['syntax']=Á.Å['syntax'];new_file['scroll_top']=0;new_file['scroll_left']=0;new_file['selection_start']=0;new_file['selection_end']=0;new_file['edited']=Ì;new_file['font_size']=Á.Å[\"font_size\"];new_file['font_family']=Á.Å[\"font_family\"];new_file['word_wrap']=Á.Å[\"word_wrap\"];new_file['toolbar']={'links':{},'selects':{}};new_file['compare_edited_text']=new_file['text'];Á.files[id]=new_file;Á.update_file(id,Å);Á.files[id]['compare_edited_text']=Á.files[id]['text'];var html_id='tab_file_'+encodeURIComponent(id);Á.filesIdAssoc[html_id]=id;Á.files[id]['html_id']=html_id;if(!_$(Á.files[id]['html_id'])&&id!=\"\"){Á.tab_browsing_area.Ç.display=\"block\";var elem=document.createElement('li');elem.id=Á.files[id]['html_id'];var close=\"<img src=\\\"\"+È.eAL.baseURL+\"images/close.gif\\\" title=\\\"\"+Á.get_translation('close_tab','word')+\"\\\" onclick=\\\"eA.execCommand('close_file',eA.filesIdAssoc['\"+html_id+\"']);return Ì;\\\" class=\\\"hidden\\\" onmouseover=\\\"Á.className=''\\\" onmouseout=\\\"Á.className='hidden'\\\" />\";elem.innerHTML=\"<a onclick=\\\"javascript:eA.execCommand('switch_to_file',eA.filesIdAssoc['\"+html_id+\"']);\\\" selec=\\\"none\\\"><b><span><strong class=\\\"edited\\\">*</strong>\"+Á.files[id]['title']+close+\"</span></b></a>\";_$('tab_browsing_list').appendChild(elem);var elem=document.createElement('text');Á.update_size();}if(id!=\"\")Á.execCommand('file_open',Á.files[id]);Á.switch_to_file(id,Ë);return Ë;}\nelse return Ì;};EA.Ä.close_file=Ã(id){if(Á.files[id]){Á.save_file(id);if(Á.execCommand('file_close',Á.files[id])!==Ì){var li=_$(Á.files[id]['html_id']);li.ÈNode.removeChild(li);if(id==Á.curr_file){var next_file=\"\";var is_next=Ì;for(var i in Á.files){if(is_next){next_file=i;break;}\nelse if(i==id)is_next=Ë;\nelse next_file=i;}Á.switch_to_file(next_file);}delete(Á.files[id]);Á.update_size();}}};EA.Ä.save_file=Ã(id){var t=Á,save,a_links,a_selects,save_butt,img,i;if(t.files[id]){var save=t.files[id];save['É']=t.É;save['last_text_to_highlight']=t.last_text_to_highlight;save['last_hightlighted_text']=t.last_hightlighted_text;save['previous']=t.previous;save['next']=t.next;save['last_undo']=t.last_undo;save['smooth_selection']=t.smooth_selection;save['do_highlight']=t.do_highlight;save['syntax']=t.Å['syntax'];save['text']=t.Â.Ê;save['scroll_top']=t.result.scrollTop;save['scroll_left']=t.result.scrollLeft;save['selection_start']=t.É[\"selectionStart\"];save['selection_end']=t.É[\"selectionEnd\"];save['font_size']=t.Å[\"font_size\"];save['font_family']=t.Å[\"font_family\"];save['word_wrap']=t.Å[\"word_wrap\"];save['toolbar']={'links':{},'selects':{}};a_links=_$(\"toolbar_1\").getElementsByTagName(\"a\");for(i=0;i<a_links.Æ;i++){if(a_links[i].getAttribute('fileSpecific')=='yes'){save_butt={};img=a_links[i].getElementsByTagName('img')[0];save_butt['classLock']=img.classLock;save_butt['className']=img.className;save_butt['oldClassName']=img.oldClassName;save['toolbar']['links'][a_links[i].id]=save_butt;}}a_selects=_$(\"toolbar_1\").getElementsByTagName(\"select\");for(i=0;i<a_selects.Æ;i++){if(a_selects[i].getAttribute('fileSpecific')=='yes'){save['toolbar']['selects'][a_selects[i].id]=a_selects[i].Ê;}}t.files[id]=save;return save;}return Ì;};EA.Ä.update_file=Ã(id,new_Ês){for(var i in new_Ês){Á.files[id][i]=new_Ês[i];}};EA.Ä.display_file=Ã(id){var t=Á,a=t.Â,new_file,a_lis,a_selects,a_links,a_options,i,j;if(id==''){a.readOnly=Ë;t.tab_browsing_area.Ç.display=\"none\";_$(\"no_file_selected\").Ç.display=\"block\";t.result.className=\"empty\";if(!t.files['']){t.open_file({id:''});}}\nelse if(typeof(t.files[id])=='undefined'){return Ì;}\nelse{t.result.className=\"\";a.readOnly=!t.is_editable;_$(\"no_file_selected\").Ç.display=\"none\";t.tab_browsing_area.Ç.display=\"block\";}t.check_redo(Ë);t.check_undo(Ë);t.curr_file=id;a_lis=t.tab_browsing_area.getElementsByTagName('li');for(i=0;i<a_lis.Æ;i++){if(a_lis[i].id==t.files[id]['html_id'])a_lis[i].className='selected';\nelse a_lis[i].className='';}new_file=t.files[id];a.Ê=new_file['text'];t.set_font(new_file['font_family'],new_file['font_size']);t.area_select(new_file['É']['selection_start'],new_file['É']['selection_end']-new_file['É']['selection_start']);t.manage_size(Ë);t.result.scrollTop=new_file['scroll_top'];t.result.scrollLeft=new_file['scroll_left'];t.previous=new_file['previous'];t.next=new_file['next'];t.last_undo=new_file['last_undo'];t.check_redo(Ë);t.check_undo(Ë);t.execCommand(\"change_highlight\",new_file['do_highlight']);t.execCommand(\"change_syntax\",new_file['syntax']);t.execCommand(\"change_smooth_selection_mode\",new_file['smooth_selection']);t.execCommand(\"set_word_wrap\",new_file['word_wrap']);a_links=new_file['toolbar']['links'];for(i in a_links){if(img=_$(i).getElementsByTagName('img')[0]){img.classLock=a_links[i]['classLock'];img.className=a_links[i]['className'];img.oldClassName=a_links[i]['oldClassName'];}}a_selects=new_file['toolbar']['selects'];for(i in a_selects){a_options=_$(i).options;for(j=0;j<a_options.Æ;j++){if(a_options[j].Ê==a_selects[i])_$(i).options[j].selected=Ë;}}};EA.Ä.switch_to_file=Ã(file_to_show,force_refresh){if(file_to_show!=Á.curr_file||force_refresh){Á.save_file(Á.curr_file);if(Á.curr_file!='')Á.execCommand('file_switch_off',Á.files[Á.curr_file]);Á.display_file(file_to_show);if(file_to_show!='')Á.execCommand('file_switch_on',Á.files[file_to_show]);}};EA.Ä.get_file=Ã(id){if(id==Á.curr_file)Á.save_file(id);return Á.files[id];};EA.Ä.get_all_files=Ã(){tmp_files=Á.files;Á.save_file(Á.curr_file);if(tmp_files[''])delete(Á.files['']);return tmp_files;};EA.Ä.check_file_changes=Ã(){var id=Á.curr_file;if(Á.files[id]&&Á.files[id]['compare_edited_text']!=undefined){if(Á.files[id]['compare_edited_text'].Æ==Á.Â.Ê.Æ&&Á.files[id]['compare_edited_text']==Á.Â.Ê){if(Á.files[id]['edited']!=Ì)Á.set_file_edited_mode(id,Ì);}\nelse{if(Á.files[id]['edited']!=Ë)Á.set_file_edited_mode(id,Ë);}}};EA.Ä.set_file_edited_mode=Ã(id,to){if(Á.files[id]&&_$(Á.files[id]['html_id'])){var link=_$(Á.files[id]['html_id']).getElementsByTagName('a')[0];if(to==Ë){link.className='edited';}\nelse{link.className='';if(id==Á.curr_file)text=Á.Â.Ê;\nelse text=Á.files[id]['text'];Á.files[id]['compare_edited_text']=text;}Á.files[id]['edited']=to;}};EA.Ä.set_show_line_colors=Ã(new_Ê){Á.show_line_colors=new_Ê;if(new_Ê)Á.selection_field.className+=' show_colors';\nelse Á.selection_field.className=Á.selection_field.className.replace(/ show_colors/g,'');};var EA_keys={8:\"Retour arriere\",9:\"Tabulation\",12:\"Milieu(pave numerique)\",13:\"Entrer\",16:\"Shift\",17:\"Ctrl\",18:\"Alt\",19:\"Pause\",20:\"Verr Maj\",27:\"Esc\",32:\"Space\",33:\"Page up\",34:\"Page down\",35:\"End\",36:\"Begin\",37:\"Left\",38:\"Up\",39:\"Right\",40:\"Down\",44:\"Impr ecran\",45:\"Inser\",46:\"Suppr\",91:\"Menu Demarrer Windows / touche pomme Mac\",92:\"Menu Demarrer Windows\",93:\"Menu contextuel Windows\",112:\"F1\",113:\"F2\",114:\"F3\",115:\"F4\",116:\"F5\",117:\"F6\",118:\"F7\",119:\"F8\",120:\"F9\",121:\"F10\",122:\"F11\",123:\"F12\",144:\"Verr Num\",145:\"Arret defil\"};Ã keyDown(e){if(!e){e=event;}for(var i in eA.plugins){if(typeof(eA.plugins[i].onkeydown)==\"Ã\"){if(eA.plugins[i].onkeydown(e)===Ì){if(eA.isIE)e.keyCode=0;return Ì;}}}var target_id=(e.target||e.srcElement).id;var use=Ì;if(EA_keys[e.keyCode])letter=EA_keys[e.keyCode];\nelse letter=String.fromCharCode(e.keyCode);var low_letter=letter.toLowerCase();if(letter==\"Page up\"&&!eA.isOpera){eA.execCommand(\"scroll_page\",{\"dir\":\"up\",\"shift\":ShiftPressed(e)});use=Ë;}\nelse if(letter==\"Page down\"&&!eA.isOpera){eA.execCommand(\"scroll_page\",{\"dir\":\"down\",\"shift\":ShiftPressed(e)});use=Ë;}\nelse if(eA.is_editable==Ì){return Ë;}\nelse if(letter==\"Tabulation\"&&target_id==\"Â\"&&!CtrlPressed(e)&&!AltPressed(e)){if(ShiftPressed(e))eA.execCommand(\"invert_tab_selection\");\nelse eA.execCommand(\"tab_selection\");use=Ë;if(eA.isOpera||(eA.isFirefox&&eA.isMac))setTimeout(\"eA.execCommand('focus');\",1);}\nelse if(letter==\"Entrer\"&&target_id==\"Â\"){if(eA.press_enter())use=Ë;}\nelse if(letter==\"Entrer\"&&target_id==\"area_search\"){eA.execCommand(\"area_search\");use=Ë;}\nelse  if(letter==\"Esc\"){eA.execCommand(\"close_all_inline_popup\",e);use=Ë;}\nelse if(CtrlPressed(e)&&!AltPressed(e)&&!ShiftPressed(e)){switch(low_letter){case \"f\":eA.execCommand(\"area_search\");use=Ë;break;case \"r\":eA.execCommand(\"area_replace\");use=Ë;break;case \"q\":eA.execCommand(\"close_all_inline_popup\",e);use=Ë;break;case \"h\":eA.execCommand(\"change_highlight\");use=Ë;break;case \"g\":setTimeout(\"eA.execCommand('go_to_line');\",5);use=Ë;break;case \"e\":eA.execCommand(\"show_help\");use=Ë;break;case \"z\":use=Ë;eA.execCommand(\"undo\");break;case \"y\":use=Ë;eA.execCommand(\"redo\");break;default:break;}}if(eA.next.Æ > 0){setTimeout(\"eA.check_redo();\",10);}setTimeout(\"eA.check_file_changes();\",10);if(use){if(eA.isIE)e.keyCode=0;return Ì;}return Ë;};Ã AltPressed(e){if(window.event){return(window.event.altKey);}\nelse{if(e.modifiers)return(e.altKey||(e.modifiers % 2));\nelse return e.altKey;}};Ã CtrlPressed(e){if(window.event){return(window.event.ctrlKey);}\nelse{return(e.ctrlKey||(e.modifiers==2)||(e.modifiers==3)||(e.modifiers>5));}};Ã ShiftPressed(e){if(window.event){return(window.event.shiftKey);}\nelse{return(e.shiftKey||(e.modifiers>3));}};	EA.Ä.show_search=Ã(){if(_$(\"area_search_replace\").Ç.visibility==\"visible\"){Á.hidden_search();}\nelse{Á.open_inline_popup(\"area_search_replace\");var text=Á.area_get_selection();var search=text.split(\"\\n\")[0];_$(\"area_search\").Ê=search;_$(\"area_search\").focus();}};EA.Ä.hidden_search=Ã(){Á.close_inline_popup(\"area_search_replace\");};EA.Ä.area_search=Ã(mode){if(!mode)mode=\"search\";_$(\"area_search_msg\").innerHTML=\"\";var search=_$(\"area_search\").Ê;Á.Â.focus();Á.Â.ÂFocused=Ë;var infos=Á.get_selection_infos();var start=infos[\"selectionStart\"];var pos=-1;var pos_begin=-1;var Æ=search.Æ;if(_$(\"area_search_replace\").Ç.visibility!=\"visible\"){Á.show_search();return;}if(search.Æ==0){_$(\"area_search_msg\").innerHTML=Á.get_translation(\"search_field_empty\");return;}if(mode!=\"replace\"){if(_$(\"area_search_reg_exp\").checked)start++;\nelse start+=search.Æ;}if(_$(\"area_search_reg_exp\").checked){var opt=\"m\";if(!_$(\"area_search_match_case\").checked)opt+=\"i\";var reg=new RegExp(search,opt);pos=infos[\"full_text\"].substr(start).search(reg);pos_begin=infos[\"full_text\"].search(reg);if(pos!=-1){pos+=start;Æ=infos[\"full_text\"].substr(start).match(reg)[0].Æ;}\nelse if(pos_begin!=-1){Æ=infos[\"full_text\"].match(reg)[0].Æ;}}\nelse{if(_$(\"area_search_match_case\").checked){pos=infos[\"full_text\"].indexOf(search,start);pos_begin=infos[\"full_text\"].indexOf(search);}\nelse{pos=infos[\"full_text\"].toLowerCase().indexOf(search.toLowerCase(),start);pos_begin=infos[\"full_text\"].toLowerCase().indexOf(search.toLowerCase());}}if(pos==-1&&pos_begin==-1){_$(\"area_search_msg\").innerHTML=\"<strong>\"+search+\"</strong> \"+Á.get_translation(\"not_found\");return;}\nelse if(pos==-1&&pos_begin !=-1){begin=pos_begin;_$(\"area_search_msg\").innerHTML=Á.get_translation(\"restart_search_at_begin\");}\nelse begin=pos;if(mode==\"replace\"&&pos==infos[\"indexOfCursor\"]){var replace=_$(\"area_replace\").Ê;var new_text=\"\";if(_$(\"area_search_reg_exp\").checked){var opt=\"m\";if(!_$(\"area_search_match_case\").checked)opt+=\"i\";var reg=new RegExp(search,opt);new_text=infos[\"full_text\"].substr(0,begin)+infos[\"full_text\"].substr(start).replace(reg,replace);}\nelse{new_text=infos[\"full_text\"].substr(0,begin)+replace+infos[\"full_text\"].substr(begin+Æ);}Á.Â.Ê=new_text;Á.area_select(begin,Æ);Á.area_search();}\nelse Á.area_select(begin,Æ);};EA.Ä.area_replace=Ã(){Á.area_search(\"replace\");};EA.Ä.area_replace_all=Ã(){var base_text=Á.Â.Ê;var search=_$(\"area_search\").Ê;var replace=_$(\"area_replace\").Ê;if(search.Æ==0){_$(\"area_search_msg\").innerHTML=Á.get_translation(\"search_field_empty\");return;}var new_text=\"\";var nb_change=0;if(_$(\"area_search_reg_exp\").checked){var opt=\"mg\";if(!_$(\"area_search_match_case\").checked)opt+=\"i\";var reg=new RegExp(search,opt);nb_change=infos[\"full_text\"].match(reg).Æ;new_text=infos[\"full_text\"].replace(reg,replace);}\nelse{if(_$(\"area_search_match_case\").checked){var tmp_tab=base_text.split(search);nb_change=tmp_tab.Æ-1;new_text=tmp_tab.join(replace);}\nelse{var lower_Ê=base_text.toLowerCase();var lower_search=search.toLowerCase();var start=0;var pos=lower_Ê.indexOf(lower_search);while(pos!=-1){nb_change++;new_text+=Á.Â.Ê.substring(start,pos)+replace;start=pos+search.Æ;pos=lower_Ê.indexOf(lower_search,pos+1);}new_text+=Á.Â.Ê.substring(start);}}if(new_text==base_text){_$(\"area_search_msg\").innerHTML=\"<strong>\"+search+\"</strong> \"+Á.get_translation(\"not_found\");}\nelse{Á.Â.Ê=new_text;_$(\"area_search_msg\").innerHTML=\"<strong>\"+nb_change+\"</strong> \"+Á.get_translation(\"occurrence_replaced\");setTimeout(\"eA.Â.focus();eA.Â.ÂFocused=Ë;\",100);}}; EA.Ä.change_highlight=Ã(change_to){if(Á.Å[\"syntax\"].Æ==0&&change_to==Ì){Á.switchClassSticky(_$(\"highlight\"),'editAreaButtonDisabled',Ë);Á.switchClassSticky(_$(\"reset_highlight\"),'editAreaButtonDisabled',Ë);return Ì;}if(Á.do_highlight==change_to)return Ì;Á.getIESelection();var pos_start=Á.Â.selectionStart;var pos_end=Á.Â.selectionEnd;if(Á.do_highlight===Ë||change_to==Ì)Á.disable_highlight();\nelse Á.enable_highlight();Á.Â.focus();Á.Â.selectionStart=pos_start;Á.Â.selectionEnd=pos_end;Á.setIESelection();};EA.Ä.disable_highlight=Ã(displayOnly){var t=Á,a=t.Â,new_Obj,old_class,new_class;t.selection_field.innerHTML=\"\";t.selection_field_text.innerHTML=\"\";t.content_highlight.Ç.visibility=\"hidden\";new_Obj=t.content_highlight.cloneNode(Ì);new_Obj.innerHTML=\"\";t.content_highlight.ÈNode.insertBefore(new_Obj,t.content_highlight);t.content_highlight.ÈNode.removeChild(t.content_highlight);t.content_highlight=new_Obj;old_class=È.getAttribute(a,\"class\");if(old_class){new_class=old_class.replace(\"hidden\",\"\");È.setAttribute(a,\"class\",new_class);}a.Ç.backgroundColor=\"transÈ\";t.switchClassSticky(_$(\"highlight\"),'editAreaButtonNormal',Ë);t.switchClassSticky(_$(\"reset_highlight\"),'editAreaButtonDisabled',Ë);t.do_highlight=Ì;t.switchClassSticky(_$(\"change_smooth_selection\"),'editAreaButtonSelected',Ë);if(typeof(t.smooth_selection_before_highlight)!=\"undefined\"&&t.smooth_selection_before_highlight===Ì){t.change_smooth_selection_mode(Ì);}};EA.Ä.enable_highlight=Ã(){var t=Á,a=t.Â,new_class;t.show_waiting_screen();t.content_highlight.Ç.visibility=\"visible\";new_class=È.getAttribute(a,\"class\")+\" hidden\";È.setAttribute(a,\"class\",new_class);if(t.isIE)a.Ç.backgroundColor=\"#FFFFFF\";t.switchClassSticky(_$(\"highlight\"),'editAreaButtonSelected',Ì);t.switchClassSticky(_$(\"reset_highlight\"),'editAreaButtonNormal',Ì);t.smooth_selection_before_highlight=t.smooth_selection;if(!t.smooth_selection)t.change_smooth_selection_mode(Ë);t.switchClassSticky(_$(\"change_smooth_selection\"),'editAreaButtonDisabled',Ë);t.do_highlight=Ë;t.resync_highlight();t.hide_waiting_screen();};EA.Ä.maj_highlight=Ã(infos){var debug_opti=\"\",tps_start=new Date().getTime(),tps_middle_opti=new Date().getTime();var t=Á,hightlighted_text,updated_highlight;var textToHighlight=infos[\"full_text\"],doSyntaxOpti=Ì,doHtmlOpti=Ì,stay_begin=\"\",stay_end=\"\",trace_new,trace_last;if(t.last_text_to_highlight==infos[\"full_text\"]&&t.resync_highlight!==Ë)return;if(t.reload_highlight===Ë){t.reload_highlight=Ì;}\nelse if(textToHighlight.Æ==0){textToHighlight=\"\\n \";}\nelse{changes=t.checkTextEvolution(t.last_text_to_highlight,textToHighlight);trace_new=t.get_syntax_trace(changes.newTextLine).replace(/\\r/g,'');trace_last=t.get_syntax_trace(changes.lastTextLine).replace(/\\r/g,'');doSyntaxOpti=(trace_new==trace_last);if(!doSyntaxOpti&&trace_new==\"\\n\"+trace_last&&/^[ \t\s]*\\n[ \t\s]*$/.test(changes.newText.replace(/\\r/g,''))&&changes.lastText==\"\"){doSyntaxOpti=Ë;}if(doSyntaxOpti){tps_middle_opti=new Date().getTime();stay_begin=t.last_hightlighted_text.split(\"\\n\").slice(0,changes.lineStart).join(\"\\n\");if(changes.lineStart>0)stay_begin+=\"\\n\";stay_end=t.last_hightlighted_text.split(\"\\n\").slice(changes.lineLastEnd+1).join(\"\\n\");if(stay_end.Æ>0)stay_end=\"\\n\"+stay_end;if(stay_begin.split('<span').Æ !=stay_begin.split('</span').Æ||stay_end.split('<span').Æ !=stay_end.split('</span').Æ){doSyntaxOpti=Ì;stay_end='';stay_begin='';}\nelse{if(stay_begin.Æ==0&&changes.posLastEnd==-1)changes.newTextLine+=\"\\n\";textToHighlight=changes.newTextLine;}}if(t.Å[\"debug\"]){var ch=changes;debug_opti=(doSyntaxOpti?\"Optimisation\":\"No optimisation\")+\" start:\"+ch.posStart+\"(\"+ch.lineStart+\")\"+\" end_new:\"+ch.posNewEnd+\"(\"+ch.lineNewEnd+\")\"+\" end_last:\"+ch.posLastEnd+\"(\"+ch.lineLastEnd+\")\"+\"\\nchanged_text:\"+ch.newText+\"=> trace:\"+trace_new+\"\\nchanged_last_text:\"+ch.lastText+\"=> trace:\"+trace_last+\"\\nchanged_line:\"+ch.newTextLine+\"\\nlast_changed_line:\"+ch.lastTextLine+\"\\nstay_begin:\"+stay_begin.slice(-100)+\"\\nstay_end:\"+stay_end.substr(0,100);+\"\\n\";}}tps_end_opti=new Date().getTime();updated_highlight=t.colorize_text(textToHighlight);tpsAfterReg=new Date().getTime();if(doSyntaxOpti){try{var replacedBloc,i,nbStart='',nbEnd='',newHtml,ÆOld,ÆNew;replacedBloc=t.last_hightlighted_text.substring(stay_begin.Æ,t.last_hightlighted_text.Æ-stay_end.Æ);ÆOld=replacedBloc.Æ;ÆNew=updated_highlight.Æ;for(i=0;i < ÆOld&&i < ÆNew&&replacedBloc.charAt(i)==updated_highlight.charAt(i);i++){}nbStart=i;for(i=0;i+nbStart < ÆOld&&i+nbStart < ÆNew&&replacedBloc.charAt(ÆOld-i-1)==updated_highlight.charAt(ÆNew-i-1);i++){}nbEnd=i;lastHtml=replacedBloc.substring(nbStart,ÆOld-nbEnd);newHtml=updated_highlight.substring(nbStart,ÆNew-nbEnd);if(newHtml.indexOf('<span')==-1&&newHtml.indexOf('</span')==-1&&lastHtml.indexOf('<span')==-1&&lastHtml.indexOf('</span')==-1){var beginStr,nbOpendedSpan,nbClosedSpan,nbUnchangedChars,span,textNode;doHtmlOpti=Ë;beginStr=t.last_hightlighted_text.substr(0,stay_begin.Æ+nbStart);nbOpendedSpan=beginStr.split('<span').Æ-1;nbClosedSpan=beginStr.split('</span').Æ-1;span=t.content_highlight.getElementsByTagName('span')[ nbOpendedSpan ];ÈSpan=span;maxStartOffset=maxEndOffset=0;if(nbOpendedSpan==nbClosedSpan){while(ÈSpan.ÈNode !=t.content_highlight&&ÈSpan.ÈNode.tagName !='PRE'){ÈSpan=ÈSpan.ÈNode;}}\nelse{maxStartOffset=maxEndOffset=beginStr.Æ+1;nbClosed=beginStr.substr(Math.max(0,beginStr.lastIndexOf('<span',maxStartOffset-1))).split('</span').Æ-1;while(nbClosed > 0){nbClosed--;ÈSpan=ÈSpan.ÈNode;}while(ÈSpan.ÈNode !=t.content_highlight&&ÈSpan.ÈNode.tagName !='PRE'&&(tmpMaxStartOffset=Math.max(0,beginStr.lastIndexOf('<span',maxStartOffset-1)))<(tmpMaxEndOffset=Math.max(0,beginStr.lastIndexOf('</span',maxEndOffset-1)))){maxStartOffset=tmpMaxStartOffset;maxEndOffset=tmpMaxEndOffset;}}if(ÈSpan.ÈNode==t.content_highlight||ÈSpan.ÈNode.tagName=='PRE'){maxStartOffset=Math.max(0,beginStr.indexOf('<span'));}if(maxStartOffset==beginStr.Æ){nbSubSpanBefore=0;}\nelse{lastEndPos=Math.max(0,beginStr.lastIndexOf('>',maxStartOffset));nbSubSpanBefore=beginStr.substr(lastEndPos).split('<span').Æ-1;}if(nbSubSpanBefore==0){textNode=ÈSpan.firstChild;}\nelse{lastSubSpan=ÈSpan.getElementsByTagName('span')[ nbSubSpanBefore-1 ];while(lastSubSpan.ÈNode !=ÈSpan){lastSubSpan=lastSubSpan.ÈNode;}if(lastSubSpan.nextSibling==null||lastSubSpan.nextSibling.nodeType !=3){textNode=document.createTextNode('');lastSubSpan.ÈNode.insertBefore(textNode,lastSubSpan.nextSibling);}\nelse{textNode=lastSubSpan.nextSibling;}}nbUnchangedChars=beginStr.Æ-Math.max(0,beginStr.lastIndexOf('>')+1);if(t.isIE){nbUnchangedChars-=(beginStr.substr(beginStr.Æ-nbUnchangedChars).split(\"\\n\").Æ-1);textNode.replaceData(nbUnchangedChars,lastHtml.replace(/\\n/g,'').Æ,newHtml.replace(/\\n/g,''));}\nelse{textNode.replaceData(nbUnchangedChars,lastHtml.Æ,newHtml);}}}catch(e){doHtmlOpti=Ì;}}tpsAfterOpti2=new Date().getTime();hightlighted_text=stay_begin+updated_highlight+stay_end;if(!doHtmlOpti){var new_Obj=t.content_highlight.cloneNode(Ì);if((t.isIE&&t.isIE < 8)||(t.isOpera&&t.isOpera < 9.6))new_Obj.innerHTML=\"<pre><span class='\"+t.Å[\"syntax\"]+\"'>\"+hightlighted_text+\"</span></pre>\";\nelse new_Obj.innerHTML=\"<span class='\"+t.Å[\"syntax\"]+\"'>\"+hightlighted_text+\"</span>\";t.content_highlight.ÈNode.replaceChild(new_Obj,t.content_highlight);t.content_highlight=new_Obj;}t.last_text_to_highlight=infos[\"full_text\"];t.last_hightlighted_text=hightlighted_text;tps3=new Date().getTime();if(t.Å[\"debug\"]){t.debug.Ê=\"Tps optimisation \"+(tps_end_opti-tps_start)+\" | tps reg exp:\"+(tpsAfterReg-tps_end_opti)+\" | tps opti HTML:\"+(tpsAfterOpti2-tpsAfterReg)+' '+(doHtmlOpti ? 'yes':'no')+\" | tps update highlight content:\"+(tps3-tpsAfterOpti2)+\" | tpsTotal:\"+(tps3-tps_start)+\"(\"+tps3+\")\\n\"+debug_opti;}};EA.Ä.resync_highlight=Ã(reload_now){Á.reload_highlight=Ë;Á.last_text_to_highlight=\"\";Á.focus();if(reload_now)Á.check_line_selection(Ì);}; EA.Ä.comment_or_quote=Ã(){var new_class=\"\",close_tag=\"\",sy,arg,i;sy=È.eAL.syntax[eA.current_code_lang];arg=EA.Ä.comment_or_quote.arguments[0];for(i in sy[\"quotes\"]){if(arg.indexOf(i)==0){new_class=\"quotesmarks\";close_tag=sy[\"quotes\"][i];}}if(new_class.Æ==0){for(var i in sy[\"comments\"]){if(arg.indexOf(i)==0){new_class=\"comments\";close_tag=sy[\"comments\"][i];}}}if(close_tag==\"\\n\"){return \"µ__\"+new_class+\"__µ\"+arg.replace(/(\\r?\\n)?$/m,\"µ_END_µ$1\");}\nelse{reg=new RegExp(È.eAL.get_escaped_regexp(close_tag)+\"$\",\"m\");if(arg.search(reg)!=-1)return \"µ__\"+new_class+\"__µ\"+arg+\"µ_END_µ\";\nelse return \"µ__\"+new_class+\"__µ\"+arg;}};EA.Ä.get_syntax_trace=Ã(text){if(Á.Å[\"syntax\"].Æ>0&&È.eAL.syntax[Á.Å[\"syntax\"]][\"syntax_trace_regexp\"])return text.replace(È.eAL.syntax[Á.Å[\"syntax\"]][\"syntax_trace_regexp\"],\"$3\");};EA.Ä.colorize_text=Ã(text){text=\" \"+text;if(Á.Å[\"syntax\"].Æ>0)text=Á.apply_syntax(text,Á.Å[\"syntax\"]);return text.substr(1).replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\").replace(/>/g,\"&gt;\").replace(/µ_END_µ/g,\"</span>\").replace(/µ__([a-zA-Z0-9]+)__µ/g,\"<span class='$1'>\");};EA.Ä.apply_syntax=Ã(text,lang){var sy;Á.current_code_lang=lang;if(!È.eAL.syntax[lang])return text;sy=È.eAL.syntax[lang];if(sy[\"custom_regexp\"]['before']){for(var i in sy[\"custom_regexp\"]['before']){var convert=\"$1µ__\"+sy[\"custom_regexp\"]['before'][i]['class']+\"__µ$2µ_END_µ$3\";text=text.replace(sy[\"custom_regexp\"]['before'][i]['regexp'],convert);}}if(sy[\"comment_or_quote_reg_exp\"]){text=text.replace(sy[\"comment_or_quote_reg_exp\"],Á.comment_or_quote);}if(sy[\"keywords_reg_exp\"]){for(var i in sy[\"keywords_reg_exp\"]){text=text.replace(sy[\"keywords_reg_exp\"][i],'µ__'+i+'__µ$2µ_END_µ');}}if(sy[\"delimiters_reg_exp\"]){text=text.replace(sy[\"delimiters_reg_exp\"],'µ__delimiters__µ$1µ_END_µ');}if(sy[\"operators_reg_exp\"]){text=text.replace(sy[\"operators_reg_exp\"],'µ__operators__µ$1µ_END_µ');}if(sy[\"custom_regexp\"]['after']){for(var i in sy[\"custom_regexp\"]['after']){var convert=\"$1µ__\"+sy[\"custom_regexp\"]['after'][i]['class']+\"__µ$2µ_END_µ$3\";text=text.replace(sy[\"custom_regexp\"]['after'][i]['regexp'],convert);}}return text;};var editArea= eA;EditArea=EA;</script>".replace(/Á/g,'this').replace(/Â/g,'textarea').replace(/Ã/g,'function').replace(/Ä/g,'prototype').replace(/Å/g,'settings').replace(/Æ/g,'length').replace(/Ç/g,'style').replace(/È/g,'parent').replace(/É/g,'last_selection').replace(/Ê/g,'value').replace(/Ë/g,'true').replace(/Ì/g,'false');
editAreaLoader.template= "<?xml version=\"1.0\" encoding=\"UTF-8\"?> <!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\"> <html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" > <head> <title>EditArea</title> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /> <meta http-equiv=\"X-UA-Compatible\" content=\"IE=EmulateIE7\"/> [__CSSRULES__] [__JSCODE__] </head> <body> <div id='editor'> <div class='area_toolbar' id='toolbar_1'>[__TOOLBAR__]</div> <div class='area_toolbar' id='tab_browsing_area'><ul id='tab_browsing_list' class='menu'> <li> </li> </ul></div> <div id='result'> <div id='no_file_selected'></div> <div id='container'> <div id='cursor_pos' class='edit_area_cursor'>&nbsp;</div> <div id='end_bracket' class='edit_area_cursor'>&nbsp;</div> <div id='selection_field'></div> <div id='line_number' selec='none'></div> <div id='content_highlight'></div> <div id='test_font_size'></div> <div id='selection_field_text'></div> <textarea id='textarea' wrap='off' onchange='editArea.execCommand(\"onchange\");' onfocus='javascript:editArea.textareaFocused=true;' onblur='javascript:editArea.textareaFocused=false;'> </textarea> </div> </div> <div class='area_toolbar' id='toolbar_2'> <table class='statusbar' cellspacing='0' cellpadding='0'> <tr> <td class='total' selec='none'>{$position}:</td> <td class='infos' selec='none'> {$line_abbr} <span  id='linePos'>0</span>, {$char_abbr} <span id='currPos'>0</span> </td> <td class='total' selec='none'>{$total}:</td> <td class='infos' selec='none'> {$line_abbr} <span id='nbLine'>0</span>, {$char_abbr} <span id='nbChar'>0</span> </td> <td class='resize'> <span id='resize_area'><img src='[__BASEURL__]images/statusbar_resize.gif' alt='resize' selec='none'></span> </td> </tr> </table> </div> </div> <div id='processing'> <div id='processing_text'> {$processing} </div> </div> <div id='area_search_replace' class='editarea_popup'> <table cellspacing='2' cellpadding='0' style='width: 100%'> <tr> <td selec='none'>{$search}</td> <td><input type='text' id='area_search' /></td> <td id='close_area_search_replace'> <a onclick='Javascript:editArea.execCommand(\"hidden_search\")'><img selec='none' src='[__BASEURL__]images/close.gif' alt='{$close_popup}' title='{$close_popup}' /></a><br /> </tr><tr> <td selec='none'>{$replace}</td> <td><input type='text' id='area_replace' /></td> <td><img id='move_area_search_replace' onmousedown='return parent.start_move_element(event,\"area_search_replace\", parent.frames[\"frame_\"+editArea.id]);'  src='[__BASEURL__]images/move.gif' alt='{$move_popup}' title='{$move_popup}' /></td> </tr> </table> <div class='button'> <input type='checkbox' id='area_search_match_case' /><label for='area_search_match_case' selec='none'>{$match_case}</label> <input type='checkbox' id='area_search_reg_exp' /><label for='area_search_reg_exp' selec='none'>{$reg_exp}</label> <br /> <a onclick='Javascript:editArea.execCommand(\"area_search\")' selec='none'>{$find_next}</a> <a onclick='Javascript:editArea.execCommand(\"area_replace\")' selec='none'>{$replace}</a> <a onclick='Javascript:editArea.execCommand(\"area_replace_all\")' selec='none'>{$replace_all}</a><br /> </div> <div id='area_search_msg' selec='none'></div> </div> <div id='edit_area_help' class='editarea_popup'> <div class='close_popup'> <a onclick='Javascript:editArea.execCommand(\"close_all_inline_popup\")'><img src='[__BASEURL__]images/close.gif' alt='{$close_popup}' title='{$close_popup}' /></a> </div> <div><h2>Editarea [__EA_VERSION__]</h2><br /> <h3>{$shortcuts}:</h3> {$tab}: {$add_tab}<br /> {$shift}+{$tab}: {$remove_tab}<br /> {$ctrl}+f: {$search_command}<br /> {$ctrl}+r: {$replace_command}<br /> {$ctrl}+h: {$highlight}<br /> {$ctrl}+g: {$go_to_line}<br /> {$ctrl}+z: {$undo}<br /> {$ctrl}+y: {$redo}<br /> {$ctrl}+e: {$help}<br /> {$ctrl}+q, {$esc}: {$close_popup}<br /> {$accesskey} E: {$toggle}<br /> <br /> <em>{$about_notice}</em> <br /><div class='copyright'>&copy; Christophe Dolivet 2007-2009</div> </div> </div> </body> </html> ";
editAreaLoader.iframe_css= "<style>body,html{margin:0;padding:0;height:100%;border:none;overflow:hidden;background-color:#FFF;}body,html,table,form,textarea{font:12px monospace,sans-serif;}#editor{border:solid #888 1px;overflow:hidden;}#result{z-index:4;overflow-x:auto;overflow-y:scroll;border-top:solid #888 1px;border-bottom:solid #888 1px;position:relative;clear:both;}#result.empty{overflow:hidden;}#container{overflow:hidden;border:solid blue 0;position:relative;z-index:10;padding:0 5px 0 45px;}#textarea{position:relative;top:0;left:0;margin:0;padding:0;width:100%;height:100%;overflow:hidden;z-index:7;border-width:0;background-color:transparent;resize:none;}#textarea,#textarea:hover{outline:none;}#content_highlight{white-space:pre;margin:0;padding:0;position:absolute;z-index:4;overflow:visible;}#selection_field,#selection_field_text{margin:0;background-color:#E1F2F9;position:absolute;z-index:5;top:-100px;padding:0;white-space:pre;overflow:hidden;}#selection_field.show_colors {z-index:3;background-color:#EDF9FC;}#selection_field strong{font-weight:normal;}#selection_field.show_colors *,#selection_field_text * {visibility:hidden;}#selection_field_text{background-color:transparent;}#selection_field_text strong{font-weight:normal;background-color:#3399FE;color:#FFF;visibility:visible;}#container.word_wrap #content_highlight,#container.word_wrap #selection_field,#container.word_wrap #selection_field_text,#container.word_wrap #test_font_size{white-space:pre-wrap;white-space:-moz-pre-wrap !important;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:99%;}#line_number{position:absolute;overflow:hidden;border-right:solid black 1px;z-index:8;width:38px;padding:0 5px 0 0;margin:0 0 0 -45px;text-align:right;color:#AAAAAA;}#test_font_size{padding:0;margin:0;visibility:hidden;position:absolute;white-space:pre;}pre{margin:0;padding:0;}.hidden{opacity:0.2;filter:alpha(opacity=20);}#result .edit_area_cursor{position:absolute;z-index:6;background-color:#FF6633;top:-100px;margin:0;}#result .edit_area_selection_field .overline{background-color:#996600;}.editarea_popup{border:solid 1px #888888;background-color:#ECE9D8;width:250px;padding:4px;position:absolute;visibility:hidden;z-index:15;top:-500px;}.editarea_popup,.editarea_popup table{font-family:sans-serif;font-size:10pt;}.editarea_popup img{border:0;}.editarea_popup .close_popup{float:right;line-height:16px;border:0;padding:0;}.editarea_popup h1,.editarea_popup h2,.editarea_popup h3,.editarea_popup h4,.editarea_popup h5,.editarea_popup h6{margin:0;padding:0;}.editarea_popup .copyright{text-align:right;}div#area_search_replace{}div#area_search_replace img{border:0;}div#area_search_replace div.button{text-align:center;line-height:1.7em;}div#area_search_replace .button a{cursor:pointer;border:solid 1px #888888;background-color:#DEDEDE;text-decoration:none;padding:0 2px;color:#000000;white-space:nowrap;}div#area_search_replace a:hover{background-color:#EDEDED;}div#area_search_replace  #move_area_search_replace{cursor:move;border:solid 1px #888;}div#area_search_replace  #close_area_search_replace{text-align:right;vertical-align:top;white-space:nowrap;}div#area_search_replace  #area_search_msg{height:18px;overflow:hidden;border-top:solid 1px #888;margin-top:3px;}#edit_area_help{width:350px;}#edit_area_help div.close_popup{float:right;}.area_toolbar{width:100%;margin:0;padding:0;background-color:#ECE9D8;text-align:center;}.area_toolbar,.area_toolbar table{font:11px sans-serif;}.area_toolbar img{border:0;vertical-align:middle;}.area_toolbar input{margin:0;padding:0;}.area_toolbar select{font-family:'MS Sans Serif',sans-serif,Verdana,Arial;font-size:7pt;font-weight:normal;margin:2px 0 0 0 ;padding:0;vertical-align:top;background-color:#F0F0EE;}table.statusbar{width:100%;}.area_toolbar td.infos{text-align:center;width:130px;border-right:solid 1px #888;border-width:0 1px 0 0;padding:0;}.area_toolbar td.total{text-align:right;width:50px;padding:0;}.area_toolbar td.resize{text-align:right;}.area_toolbar span#resize_area{cursor:nw-resize;visibility:hidden;}.editAreaButtonNormal,.editAreaButtonOver,.editAreaButtonDown,.editAreaSeparator,.editAreaSeparatorLine,.editAreaButtonDisabled,.editAreaButtonSelected {border:0; margin:0; padding:0; background:transparent;margin-top:0;margin-left:1px;padding:0;}.editAreaButtonNormal {border:1px solid #ECE9D8 !important;cursor:pointer;}.editAreaButtonOver {border:1px solid #0A246A !important;cursor:pointer;background-color:#B6BDD2;}.editAreaButtonDown {cursor:pointer;border:1px solid #0A246A !important;background-color:#8592B5;}.editAreaButtonSelected {border:1px solid #C0C0BB !important;cursor:pointer;background-color:#F4F2E8;}.editAreaButtonDisabled {filter:progid:DXImageTransform.Microsoft.Alpha(opacity=30);-moz-opacity:0.3;opacity:0.3;border:1px solid #F0F0EE !important;cursor:pointer;}.editAreaSeparatorLine {margin:1px 2px;background-color:#C0C0BB;width:2px;height:18px;}#processing{display:none;background-color:#ECE9D8;border:solid #888 1px;position:absolute;top:0;left:0;width:100%;height:100%;z-index:100;text-align:center;}#processing_text{position:absolute;left:50%;top:50%;width:200px;height:20px;margin-left:-100px;margin-top:-10px;text-align:center;}#tab_browsing_area{display:none;background-color:#CCC9A8;border-top:1px solid #888;text-align:left;margin:0;}#tab_browsing_list {padding:0;margin:0;list-style-type:none;white-space:nowrap;}#tab_browsing_list li {float:left;margin:-1px;}#tab_browsing_list a {position:relative;display:block;text-decoration:none;float:left;cursor:pointer;line-height:14px;}#tab_browsing_list a span {display:block;color:#000;background:#ECE9D8;border:1px solid #888;border-width:1px 1px 0;text-align:center;padding:2px 2px 1px 4px;position:relative;}#tab_browsing_list a b {display:block;border-bottom:2px solid #617994;}#tab_browsing_list a .edited {display:none;}#tab_browsing_list a.edited .edited {display:inline;}#tab_browsing_list a img{margin-left:7px;}#tab_browsing_list a.edited img{margin-left:3px;}#tab_browsing_list a:hover span {background:#F4F2E8;border-color:#0A246A;}#tab_browsing_list .selected a span{background:#046380;color:#FFF;}#no_file_selected{height:100%;width:150%;background:#CCC;display:none;z-index:20;position:absolute;}.non_editable #editor{border-width:0 1px;}.non_editable .area_toolbar{display:none;}#auto_completion_area{background:#FFF;border:solid 1px #888;position:absolute;z-index:15;width:280px;height:180px;overflow:auto;display:none;}#auto_completion_area a,#auto_completion_area a:visited{display:block;padding:0 2px 1px;color:#000;text-decoration:none;}#auto_completion_area a:hover,#auto_completion_area a:focus,#auto_completion_area a.focus{background:#D6E1FE;text-decoration:none;}#auto_completion_area ul{margin:0;padding:0;list-style:none inside;}#auto_completion_area li{padding:0;}#auto_completion_area .prefix{font-style:italic;padding:0 3px;}</style>";
(function(a){a.uniform={options:{selectClass:"selector",radioClass:"radio",checkboxClass:"checker",fileClass:"uploader",filenameClass:"filename",fileBtnClass:"action",fileDefaultText:"No file selected",fileBtnText:"Choose File",checkedClass:"checked",focusClass:"focus",disabledClass:"disabled",buttonClass:"button",activeClass:"active",hoverClass:"hover",useID:true,idPrefix:"uniform",resetSelector:false,autoHide:true},elements:[]};if(a.browser.msie&&a.browser.version<7){a.support.selectOpacity=false}else{a.support.selectOpacity=true}a.fn.uniform=function(k){k=a.extend(a.uniform.options,k);var d=this;if(k.resetSelector!=false){a(k.resetSelector).mouseup(function(){function l(){a.uniform.update(d)}setTimeout(l,10)})}function j(l){$el=a(l);$el.addClass($el.attr("type"));b(l)}function g(l){a(l).addClass("uniform");b(l)}function i(o){var m=a(o);var p=a("<div>"),l=a("<span>");p.addClass(k.buttonClass);if(k.useID&&m.attr("id")!=""){p.attr("id",k.idPrefix+"-"+m.attr("id"))}var n;if(m.is("a")||m.is("button")){n=m.text()}else{if(m.is(":submit")||m.is(":reset")||m.is("input[type=button]")){n=m.attr("value")}}n=n==""?m.is(":reset")?"Reset":"Submit":n;l.html(n);m.css("opacity",0);m.wrap(p);m.wrap(l);p=m.closest("div");l=m.closest("span");if(m.is(":disabled")){p.addClass(k.disabledClass)}p.bind({"mouseenter.uniform":function(){p.addClass(k.hoverClass)},"mouseleave.uniform":function(){p.removeClass(k.hoverClass);p.removeClass(k.activeClass)},"mousedown.uniform touchbegin.uniform":function(){p.addClass(k.activeClass)},"mouseup.uniform touchend.uniform":function(){p.removeClass(k.activeClass)},"click.uniform touchend.uniform":function(r){if(a(r.target).is("span")||a(r.target).is("div")){if(o[0].dispatchEvent){var q=document.createEvent("MouseEvents");q.initEvent("click",true,true);o[0].dispatchEvent(q)}else{o[0].click()}}}});o.bind({"focus.uniform":function(){p.addClass(k.focusClass)},"blur.uniform":function(){p.removeClass(k.focusClass)}});a.uniform.noSelect(p);b(o)}function e(o){var m=a(o);var p=a("<div />"),l=a("<span />");if(!m.css("display")=="none"&&k.autoHide){p.hide()}p.addClass(k.selectClass);if(k.useID&&o.attr("id")!=""){p.attr("id",k.idPrefix+"-"+o.attr("id"))}var n=o.find(":selected:first");if(n.length==0){n=o.find("option:first")}l.html(n.html());o.css("opacity",0);o.wrap(p);o.before(l);p=o.parent("div");l=o.siblings("span");o.bind({"change.uniform":function(){l.text(o.find(":selected").html());p.removeClass(k.activeClass)},"focus.uniform":function(){p.addClass(k.focusClass)},"blur.uniform":function(){p.removeClass(k.focusClass);p.removeClass(k.activeClass)},"mousedown.uniform touchbegin.uniform":function(){p.addClass(k.activeClass)},"mouseup.uniform touchend.uniform":function(){p.removeClass(k.activeClass)},"click.uniform touchend.uniform":function(){p.removeClass(k.activeClass)},"mouseenter.uniform":function(){p.addClass(k.hoverClass)},"mouseleave.uniform":function(){p.removeClass(k.hoverClass);p.removeClass(k.activeClass)},"keyup.uniform":function(){l.text(o.find(":selected").html())}});if(a(o).attr("disabled")){p.addClass(k.disabledClass)}a.uniform.noSelect(l);b(o)}function f(n){var m=a(n);var o=a("<div />"),l=a("<span />");if(!m.css("display")=="none"&&k.autoHide){o.hide()}o.addClass(k.checkboxClass);if(k.useID&&n.attr("id")!=""){o.attr("id",k.idPrefix+"-"+n.attr("id"))}a(n).wrap(o);a(n).wrap(l);l=n.parent();o=l.parent();a(n).css("opacity",0).bind({"focus.uniform":function(){o.addClass(k.focusClass)},"blur.uniform":function(){o.removeClass(k.focusClass)},"click.uniform touchend.uniform":function(){if(!a(n).attr("checked")){l.removeClass(k.checkedClass)}else{l.addClass(k.checkedClass)}},"mousedown.uniform touchbegin.uniform":function(){o.addClass(k.activeClass)},"mouseup.uniform touchend.uniform":function(){o.removeClass(k.activeClass)},"mouseenter.uniform":function(){o.addClass(k.hoverClass)},"mouseleave.uniform":function(){o.removeClass(k.hoverClass);o.removeClass(k.activeClass)}});if(a(n).attr("checked")){l.addClass(k.checkedClass)}if(a(n).attr("disabled")){o.addClass(k.disabledClass)}b(n)}function c(n){var m=a(n);var o=a("<div />"),l=a("<span />");if(!m.css("display")=="none"&&k.autoHide){o.hide()}o.addClass(k.radioClass);if(k.useID&&n.attr("id")!=""){o.attr("id",k.idPrefix+"-"+n.attr("id"))}a(n).wrap(o);a(n).wrap(l);l=n.parent();o=l.parent();a(n).css("opacity",0).bind({"focus.uniform":function(){o.addClass(k.focusClass)},"blur.uniform":function(){o.removeClass(k.focusClass)},"click.uniform touchend.uniform":function(){if(!a(n).attr("checked")){l.removeClass(k.checkedClass)}else{var p=k.radioClass.split(" ")[0];a("."+p+" span."+k.checkedClass+":has([name='"+a(n).attr("name")+"'])").removeClass(k.checkedClass);l.addClass(k.checkedClass)}},"mousedown.uniform touchend.uniform":function(){if(!a(n).is(":disabled")){o.addClass(k.activeClass)}},"mouseup.uniform touchbegin.uniform":function(){o.removeClass(k.activeClass)},"mouseenter.uniform touchend.uniform":function(){o.addClass(k.hoverClass)},"mouseleave.uniform":function(){o.removeClass(k.hoverClass);o.removeClass(k.activeClass)}});if(a(n).attr("checked")){l.addClass(k.checkedClass)}if(a(n).attr("disabled")){o.addClass(k.disabledClass)}b(n)}function h(q){var o=a(q);var r=a("<div />"),p=a("<span>"+k.fileDefaultText+"</span>"),m=a("<span>"+k.fileBtnText+"</span>");if(!o.css("display")=="none"&&k.autoHide){r.hide()}r.addClass(k.fileClass);p.addClass(k.filenameClass);m.addClass(k.fileBtnClass);if(k.useID&&o.attr("id")!=""){r.attr("id",k.idPrefix+"-"+o.attr("id"))}o.wrap(r);o.after(m);o.after(p);r=o.closest("div");p=o.siblings("."+k.filenameClass);m=o.siblings("."+k.fileBtnClass);if(!o.attr("size")){var l=r.width();o.attr("size",l/10)}var n=function(){var s=o.val();if(s===""){s=k.fileDefaultText}else{s=s.split(/[\/\\]+/);s=s[(s.length-1)]}p.text(s)};n();o.css("opacity",0).bind({"focus.uniform":function(){r.addClass(k.focusClass)},"blur.uniform":function(){r.removeClass(k.focusClass)},"mousedown.uniform":function(){if(!a(q).is(":disabled")){r.addClass(k.activeClass)}},"mouseup.uniform":function(){r.removeClass(k.activeClass)},"mouseenter.uniform":function(){r.addClass(k.hoverClass)},"mouseleave.uniform":function(){r.removeClass(k.hoverClass);r.removeClass(k.activeClass)}});if(a.browser.msie){o.bind("click.uniform.ie7",function(){setTimeout(n,0)})}else{o.bind("change.uniform",n)}if(o.attr("disabled")){r.addClass(k.disabledClass)}a.uniform.noSelect(p);a.uniform.noSelect(m);b(q)}a.uniform.restore=function(l){if(l==undefined){l=a(a.uniform.elements)}a(l).each(function(){if(a(this).is(":checkbox")){a(this).unwrap().unwrap()}else{if(a(this).is("select")){a(this).siblings("span").remove();a(this).unwrap()}else{if(a(this).is(":radio")){a(this).unwrap().unwrap()}else{if(a(this).is(":file")){a(this).siblings("span").remove();a(this).unwrap()}else{if(a(this).is("button, :submit, :reset, a, input[type='button']")){a(this).unwrap().unwrap()}}}}}a(this).unbind(".uniform");a(this).css("opacity","1");var m=a.inArray(a(l),a.uniform.elements);a.uniform.elements.splice(m,1)})};function b(l){l=a(l).get();if(l.length>1){a.each(l,function(m,n){a.uniform.elements.push(n)})}else{a.uniform.elements.push(l)}}a.uniform.noSelect=function(l){function m(){return false}a(l).each(function(){this.onselectstart=this.ondragstart=m;a(this).mousedown(m).css({MozUserSelect:"none"})})};a.uniform.update=function(l){if(l==undefined){l=a(a.uniform.elements)}l=a(l);l.each(function(){var n=a(this);if(n.is("select")){var m=n.siblings("span");var p=n.parent("div");p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);m.html(n.find(":selected").html());if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}else{if(n.is(":checkbox")){var m=n.closest("span");var p=n.closest("div");p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);m.removeClass(k.checkedClass);if(n.is(":checked")){m.addClass(k.checkedClass)}if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}else{if(n.is(":radio")){var m=n.closest("span");var p=n.closest("div");p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);m.removeClass(k.checkedClass);if(n.is(":checked")){m.addClass(k.checkedClass)}if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}else{if(n.is(":file")){var p=n.parent("div");var o=n.siblings(k.filenameClass);btnTag=n.siblings(k.fileBtnClass);p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);o.text(n.val());if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}else{if(n.is(":submit")||n.is(":reset")||n.is("button")||n.is("a")||l.is("input[type=button]")){var p=n.closest("div");p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}}}}}})};return this.each(function(){if(a.support.selectOpacity){var l=a(this);if(l.is("select")){if(l.attr("multiple")!=true){if(l.attr("size")==undefined||l.attr("size")<=1){e(l)}}}else{if(l.is(":checkbox")){f(l)}else{if(l.is(":radio")){c(l)}else{if(l.is(":file")){h(l)}else{if(l.is(":text, :password, input[type='email']")){j(l)}else{if(l.is("textarea")){g(l)}else{if(l.is("a")||l.is(":submit")||l.is(":reset")||l.is("button")||l.is("input[type=button]")){i(l)}}}}}}}}})}})(jQuery);/**
 * TextAreaExpander plugin for jQuery
 * v1.0
 * Expands or contracts a textarea height depending on the
 * quatity of content entered by the user in the box.
 *
 * By Craig Buckler, Optimalworks.net
 *
 * As featured on SitePoint.com:
 * http://www.sitepoint.com/blogs/2009/07/29/build-auto-expanding-textarea-1/
 *
 * Please use as you wish at your own risk.
 */

/**
 * Usage:
 *
 * From JavaScript, use:
 *     $(<node>).TextAreaExpander(<minHeight>, <maxHeight>);
 *     where:
 *       <node> is the DOM node selector, e.g. "textarea"
 *       <minHeight> is the minimum textarea height in pixels (optional)
 *       <maxHeight> is the maximum textarea height in pixels (optional)
 *
 * Alternatively, in you HTML:
 *     Assign a class of "expand" to any <textarea> tag.
 *     e.g. <textarea name="textarea1" rows="3" cols="40" class="expand"></textarea>
 *
 *     Or assign a class of "expandMIN-MAX" to set the <textarea> minimum and maximum height.
 *     e.g. <textarea name="textarea1" rows="3" cols="40" class="expand50-200"></textarea>
 *     The textarea will use an appropriate height between 50 and 200 pixels.
 */

(function($) {
	
	// jQuery plugin definition
	$.fn.TextAreaExpander = function(minHeight, maxHeight) {

		var hCheck = !($.browser.msie || $.browser.opera);

		// resize a textarea
		function ResizeTextarea(e) {

			// event or initialize element?
			e = e.target || e;

			// find content length and box width
			var vlen = e.value.length, ewidth = e.offsetWidth;
			if (vlen != e.valLength || ewidth != e.boxWidth) {

				if (hCheck && (vlen < e.valLength || ewidth != e.boxWidth)) e.style.height = "25px";
				var h = Math.max(e.expandMin, Math.min(e.scrollHeight, e.expandMax));

				e.style.overflow = (e.scrollHeight > h ? "auto" : "hidden");
				e.style.height = h + "px";

				e.valLength = vlen;
				e.boxWidth = ewidth;
			}

			return true;
		};

		// initialize
		this.each(function() {

			// is a textarea?
			if (this.nodeName.toLowerCase() != "textarea") return;

			// set height restrictions
			var p = this.className.match(/expand(\d+)\-*(\d+)*/i);
			this.expandMin = minHeight || (p ? parseInt('0'+p[1], 10) : 0);
			this.expandMax = maxHeight || (p ? parseInt('0'+p[2], 10) : 99999);

			// initial resize
			ResizeTextarea(this);

			// zero vertical padding and add events
			if (!this.Initialized) {
				this.Initialized = true;
				$(this).css("padding-top", 0).css("padding-bottom", 0);
				$(this).bind("keyup", ResizeTextarea).bind("focus", ResizeTextarea);
			}
		});

		return this;
	};

})(jQuery);


// initialize all expanding textareas
jQuery(document).ready(function() {
	jQuery("textarea[class*=expand]").TextAreaExpander();
});/*
 * Inline Form Validation Engine 2.5.2, jQuery plugin
 *
 * Copyright(c) 2010, Cedric Dugas
 * http://www.position-absolute.com
 *
 * 2.0 Rewrite by Olivier Refalo
 * http://www.crionics.com
 *
 * Form validation engine allowing custom regex rules to be added.
 * Licensed under the MIT License
 */
 ;(function($) {

	 "use strict";

	 var methods = {

		 /**
		 * Kind of the constructor, called before any action
		 * @param {Map} user options
		 */
		 init: function(options) {
			 var form = this;
			 if (!form.data('jqv') || form.data('jqv') == null ) {
				 options = methods._saveOptions(form, options);
				 // bind all formError elements to close on click
				 $(".formError").live("click", function() {
					 $(this).fadeOut(150, function() {
						 // remove prompt once invisible
						 $(this).parent('.formErrorOuter').remove();
						 $(this).remove();
					 });
				 });
			 }
			 return this;
		 },
		/**
		* Attachs jQuery.validationEngine to form.submit and field.blur events
		* Takes an optional params: a list of options
		* ie. jQuery("#formID1").validationEngine('attach', {promptPosition : "centerRight"});
		*/
		attach: function(userOptions) {

			if(!$(this).is("form")) {
				alert("Sorry, jqv.attach() only applies to a form");
				return this;
			}
			
			var form = this;
			var options;

			if(userOptions)
				options = methods._saveOptions(form, userOptions);
			else
				options = form.data('jqv');

			options.validateAttribute = (form.find("[data-validation-engine*=validate]").length) ? "data-validation-engine" : "class";
			if (options.binded) {

				// bind fields
				form.find("["+options.validateAttribute+"*=validate]").not("[type=checkbox]").not("[type=radio]").not(".datepicker").bind(options.validationEventTrigger, methods._onFieldEvent);
				form.find("["+options.validateAttribute+"*=validate][type=checkbox],["+options.validateAttribute+"*=validate][type=radio]").bind("click", methods._onFieldEvent);
				form.find("["+options.validateAttribute+"*=validate][class*=datepicker]").bind(options.validationEventTrigger,{"delay": 300}, methods._onFieldEvent);
			}
			if (options.autoPositionUpdate) {
				$(window).bind("resize", {
					"noAnimation": true,
					"formElem": form
				}, methods.updatePromptsPosition);
			}
			// bind form.submit
			form.bind("submit", methods._onSubmitEvent);
			return this;
		},
		/**
		* Unregisters any bindings that may point to jQuery.validaitonEngine
		*/
		detach: function() {
			
			if(!$(this).is("form")) {
				alert("Sorry, jqv.detach() only applies to a form");
				return this;
			}

			var form = this;
			var options = form.data('jqv');

			// unbind fields
			form.find("["+options.validateAttribute+"*=validate]").not("[type=checkbox]").unbind(options.validationEventTrigger, methods._onFieldEvent);
			form.find("["+options.validateAttribute+"*=validate][type=checkbox],[class*=validate][type=radio]").unbind("click", methods._onFieldEvent);

			// unbind form.submit
			form.unbind("submit", methods.onAjaxFormComplete);

			// unbind live fields (kill)
			form.find("["+options.validateAttribute+"*=validate]").not("[type=checkbox]").die(options.validationEventTrigger, methods._onFieldEvent);
			form.find("["+options.validateAttribute+"*=validate][type=checkbox]").die("click", methods._onFieldEvent);

			// unbind form.submit
			form.die("submit", methods.onAjaxFormComplete);
			form.removeData('jqv');

			if (options.autoPositionUpdate)
				$(window).unbind("resize", methods.updatePromptsPosition);

			return this;
		},
		/**
		* Validates either a form or a list of fields, shows prompts accordingly.
		* Note: There is no ajax form validation with this method, only field ajax validation are evaluated
		*
		* @return true if the form validates, false if it fails
		*/
		validate: function() {
			if($(this).is("form"))
				return methods._validateFields(this);
			else {
				// field validation
				var form = $(this).closest('form');
				var options = form.data('jqv');  
				var r = methods._validateField($(this), options);

				if (options.onSuccess && options.InvalidFields.length == 0)
					options.onSuccess();
				else if (options.onFailure && options.InvalidFields.length > 0)
					options.onFailure();

				return r;
			}
		},
		/**
		*  Redraw prompts position, useful when you change the DOM state when validating
		*/
		updatePromptsPosition: function(event) {

			if (event && this == window) {
				var form = event.data.formElem;
				var noAnimation = event.data.noAnimation;
			}
			else
				var form = $(this.closest('form'));

			var options = form.data('jqv');
			// No option, take default one
			form.find('['+options.validateAttribute+'*=validate]').not(':hidden').not(":disabled").each(function(){
				var field = $(this);
				var prompt = methods._getPrompt(field);
				var promptText = $(prompt).find(".formErrorContent").html();

				if(prompt)
					methods._updatePrompt(field, $(prompt), promptText, undefined, false, options, noAnimation);
			});
			return this;
		},
		/**
		* Displays a prompt on a element.
		* Note that the element needs an id!
		*
		* @param {String} promptText html text to display type
		* @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
		* @param {String} possible values topLeft, topRight, bottomLeft, centerRight, bottomRight
		*/
		showPrompt: function(promptText, type, promptPosition, showArrow) {

			var form = this.closest('form');
			var options = form.data('jqv');
			// No option, take default one
			if(!options)
				options = methods._saveOptions(this, options);
			if(promptPosition)
				options.promptPosition=promptPosition;
			options.showArrow = showArrow==true;

			methods._showPrompt(this, promptText, type, false, options);
			return this;
		},
		/**
		* Closes form error prompts, CAN be invidual
		*/
		hide: function() {
			 var form = $(this).closest('form');
			 if(form.length == 0)
			 	return this;
			 var options = form.data('jqv');
			 var closingtag;
			 if($(this).is("form")) {
				 closingtag = "parentForm"+methods._getClassName($(this).attr("id"));
			 } else {
				 closingtag = methods._getClassName($(this).attr("id")) +"formError";
			 }
			 $('.'+closingtag).fadeTo(options.fadeDuration, 0.3, function() {
				 $(this).parent('.formErrorOuter').remove();
				 $(this).remove();
			 });
			 return this;
		 },
		 /**
		 * Closes all error prompts on the page
		 */
		 hideAll: function() {

			 var form = this;
			 var options = form.data('jqv');
			 var duration = options ? options.fadeDuration:0.3;
			 $('.formError').fadeTo(duration, 0.3, function() {
				 $(this).parent('.formErrorOuter').remove();
				 $(this).remove();
			 });
			 return this;
		 },
		/**
		* Typically called when user exists a field using tab or a mouse click, triggers a field
		* validation
		*/
		_onFieldEvent: function(event) {
			var field = $(this);
			var form = field.closest('form');
			var options = form.data('jqv');
			// validate the current field
			window.setTimeout(function() {
				methods._validateField(field, options);
				if (options.InvalidFields.length == 0 && options.onSuccess) {
					options.onSuccess();
				} else if (options.InvalidFields.length > 0 && options.onFailure) {
					options.onFailure();
				}
			}, (event.data) ? event.data.delay : 0);

		},
		/**
		* Called when the form is submited, shows prompts accordingly
		*
		* @param {jqObject}
		*            form
		* @return false if form submission needs to be cancelled
		*/
		_onSubmitEvent: function() {
			var form = $(this);
			var options = form.data('jqv');

			// validate each field 
			// (- skip field ajax validation, not necessary IF we will perform an ajax form validation)
			var r=methods._validateFields(form, options.ajaxFormValidation);

			if (r && options.ajaxFormValidation) {
				methods._validateFormWithAjax(form, options);
				// cancel form auto-submission - process with async call onAjaxFormComplete
				return false;
			}

			if(options.onValidationComplete) {
				options.onValidationComplete(form, r);
				return false;
			}
			return r;
		},
		/**
		* Return true if the ajax field validations passed so far
		* @param {Object} options
		* @return true, is all ajax validation passed so far (remember ajax is async)
		*/
		_checkAjaxStatus: function(options) {
			var status = true;
			$.each(options.ajaxValidCache, function(key, value) {
				if (!value) {
					status = false;
					// break the each
					return false;
				}
			});
			return status;
		},
		/**
		* Validates form fields, shows prompts accordingly
		*
		* @param {jqObject}
		*            form
		* @param {skipAjaxFieldValidation}
		*            boolean - when set to true, ajax field validation is skipped, typically used when the submit button is clicked
		*
		* @return true if form is valid, false if not, undefined if ajax form validation is done
		*/
		_validateFields: function(form, skipAjaxValidation) {
			var options = form.data('jqv');

			// this variable is set to true if an error is found
			var errorFound = false;

			// Trigger hook, start validation
			form.trigger("jqv.form.validating");
			// first, evaluate status of non ajax fields
			var first_err=null;
			form.find('['+options.validateAttribute+'*=validate]').not(':hidden').not(":disabled").each( function() {
		            var field = $(this);
		            var names = [];
		            if ($.inArray(field.attr('name'), names) < 0) {                   
		                errorFound |= methods._validateField(field, options, skipAjaxValidation);
		                if (options.doNotShowAllErrosOnSubmit)
		                    return false;
		                if (errorFound && first_err==null)
		                    first_err=field;
						names.push(field.attr('name'));
		            }
			});

			// second, check to see if all ajax calls completed ok
			// errorFound |= !methods._checkAjaxStatus(options);

			// third, check status and scroll the container accordingly
			form.trigger("jqv.form.result", [errorFound]);

			if (errorFound) {
				if (options.scroll) {
					var destination=first_err.offset().top;
					var fixleft = first_err.offset().left;

					//prompt positioning adjustment support. Usage: positionType:Xshift,Yshift (for ex.: bottomLeft:+20 or bottomLeft:-20,+10)
					var positionType=options.promptPosition;
					if (typeof(positionType)=='string' && positionType.indexOf(":")!=-1)
						positionType=positionType.substring(0,positionType.indexOf(":"));

					if (positionType!="bottomRight" && positionType!="bottomLeft") {
						var prompt_err= methods._getPrompt(first_err);
						destination=prompt_err.offset().top;
					}

					// get the position of the first error, there should be at least one, no need to check this
					//var destination = form.find(".formError:not('.greenPopup'):first").offset().top;
					if (options.isOverflown) {
						var overflowDIV = $(options.overflownDIV);
						if(!overflowDIV.length) return false;
						var scrollContainerScroll = overflowDIV.scrollTop();
						var scrollContainerPos = -parseInt(overflowDIV.offset().top);

						destination += scrollContainerScroll + scrollContainerPos - 5;
						var scrollContainer = $(options.overflownDIV + ":not(:animated)");

						scrollContainer.animate({ scrollTop: destination }, 1100, function(){
							if(options.focusFirstField) first_err.focus();
						});
					} else {
						$("html:not(:animated),body:not(:animated)").animate({
							scrollTop: destination,
							scrollLeft: fixleft
						}, 1100, function(){
							if(options.focusFirstField) first_err.focus();
						});
					}

				} else if(options.focusFirstField)
					first_err.focus();
				return false;
			}
			return true;
		},
		/**
		* This method is called to perform an ajax form validation.
		* During this process all the (field, value) pairs are sent to the server which returns a list of invalid fields or true
		*
		* @param {jqObject} form
		* @param {Map} options
		*/
		_validateFormWithAjax: function(form, options) {

			var data = form.serialize();
			var url = (options.ajaxFormValidationURL) ? options.ajaxFormValidationURL : form.attr("action");
			$.ajax({
				type: "GET",
				url: url,
				cache: false,
				dataType: "json",
				data: data,
				form: form,
				methods: methods,
				options: options,
				beforeSend: function() {
					return options.onBeforeAjaxFormValidation(form, options);
				},
				error: function(data, transport) {
					methods._ajaxError(data, transport);
				},
				success: function(json) {
					if (json !== true) {
						// getting to this case doesn't necessary means that the form is invalid
						// the server may return green or closing prompt actions
						// this flag helps figuring it out
						var errorInForm=false;
						for (var i = 0; i < json.length; i++) {
							var value = json[i];

							var errorFieldId = value[0];
							var errorField = $($("#" + errorFieldId)[0]);

							// make sure we found the element
							if (errorField.length == 1) {

								// promptText or selector
								var msg = value[2];
								// if the field is valid
								if (value[1] == true) {

									if (msg == ""  || !msg){
										// if for some reason, status==true and error="", just close the prompt
										methods._closePrompt(errorField);
									} else {
										// the field is valid, but we are displaying a green prompt
										if (options.allrules[msg]) {
											var txt = options.allrules[msg].alertTextOk;
											if (txt)
												msg = txt;
										}
										methods._showPrompt(errorField, msg, "pass", false, options, true);
									}
								} else {
									// the field is invalid, show the red error prompt
									errorInForm|=true;
									if (options.allrules[msg]) {
										var txt = options.allrules[msg].alertText;
										if (txt)
											msg = txt;
									}
									methods._showPrompt(errorField, msg, "", false, options, true);
								}
							}
						}
						options.onAjaxFormComplete(!errorInForm, form, json, options);
					} else
						options.onAjaxFormComplete(true, form, "", options);
				}
			});

		},
		/**
		* Validates field, shows prompts accordingly
		*
		* @param {jqObject}
		*            field
		* @param {Array[String]}
		*            field's validation rules
		* @param {Map}
		*            user options
		* @return true if field is valid
		*/
		_validateField: function(field, options, skipAjaxValidation) {
			if (!field.attr("id")) {
				field.attr("id", "form-validation-field-" + $.validationEngine.fieldIdCounter);
				++$.validationEngine.fieldIdCounter;
			}

			var rulesParsing = field.attr(options.validateAttribute);
			var getRules = /validate\[(.*)\]/.exec(rulesParsing);

			if (!getRules)
				return false;
			var str = getRules[1];
			var rules = str.split(/\[|,|\]/);

			// true if we ran the ajax validation, tells the logic to stop messing with prompts
			var isAjaxValidator = false;
			var fieldName = field.attr("name");
			var promptText = "";
			var required = false;
			options.isError = false;
			options.showArrow = true;

			var form = $(field.closest("form"));

			for (var i = 0; i < rules.length; i++) {
				// Fix for adding spaces in the rules
				rules[i] = rules[i].replace(" ", "")
				var errorMsg = undefined;
				switch (rules[i]) {

					case "required":
						required = true;
						errorMsg = methods._required(field, rules, i, options);
						break;
					case "custom":
						errorMsg = methods._customRegex(field, rules, i, options);
						break;
					case "groupRequired":
						// Check is its the first of group, if not, reload validation with first field
						// AND continue normal validation on present field
						var classGroup = "["+options.validateAttribute+"*=" +rules[i + 1] +"]";
						var firstOfGroup = form.find(classGroup).eq(0);
						if(firstOfGroup[0] != field[0]){
							methods._validateField(firstOfGroup, options, skipAjaxValidation)
							options.showArrow = true;
							continue;
						};
						errorMsg = methods._groupRequired(field, rules, i, options);
						if(errorMsg) required = true;
						options.showArrow = false;
						break;
					case "ajax":
						// ajax has its own prompts handling technique
						if(!skipAjaxValidation){
							methods._ajax(field, rules, i, options);
							isAjaxValidator = true;
						}
						break;
					case "minSize":
						errorMsg = methods._minSize(field, rules, i, options);
						break;
					case "maxSize":
						errorMsg = methods._maxSize(field, rules, i, options);
						break;
					case "min":
						errorMsg = methods._min(field, rules, i, options);
						break;
					case "max":
						errorMsg = methods._max(field, rules, i, options);
						break;
					case "past":
						errorMsg = methods._past(field, rules, i, options);
						break;
					case "future":
						errorMsg = methods._future(field, rules, i, options);
						break;
					case "dateRange":
						var classGroup = "["+options.validateAttribute+"*=" + rules[i + 1] + "]";
						var firstOfGroup = form.find(classGroup).eq(0);
						var secondOfGroup = form.find(classGroup).eq(1);

						//if one entry out of the pair has value then proceed to run through validation
						if (firstOfGroup[0].value || secondOfGroup[0].value) {
							errorMsg = methods._dateRange(firstOfGroup, secondOfGroup, rules, i, options);
						}
						if (errorMsg) required = true;
						options.showArrow = false;
						break;

					case "dateTimeRange":
						var classGroup = "["+options.validateAttribute+"*=" + rules[i + 1] + "]";
						var firstOfGroup = form.find(classGroup).eq(0);
						var secondOfGroup = form.find(classGroup).eq(1);

						//if one entry out of the pair has value then proceed to run through validation
						if (firstOfGroup[0].value || secondOfGroup[0].value) {
							errorMsg = methods._dateTimeRange(firstOfGroup, secondOfGroup, rules, i, options);
						}
						if (errorMsg) required = true;
						options.showArrow = false;
						break;
					case "maxCheckbox":
						errorMsg = methods._maxCheckbox(form, field, rules, i, options);
						field = $(form.find("input[name='" + fieldName + "']"));
						break;
					case "minCheckbox":
						errorMsg = methods._minCheckbox(form, field, rules, i, options);
						field = $(form.find("input[name='" + fieldName + "']"));
						break;
					case "equals":
						errorMsg = methods._equals(field, rules, i, options);
						break;
					case "funcCall":
						errorMsg = methods._funcCall(field, rules, i, options);
						break;
					case "creditCard":
						errorMsg = methods._creditCard(field, rules, i, options);
						break;

					default:
					//$.error("jQueryValidator rule not found"+rules[i]);
				}
				if (errorMsg !== undefined) {
					promptText += errorMsg + "<br/>";
					options.isError = true;
				}
			}
			// If the rules required is not added, an empty field is not validated
			if(!required && field.val() == "") options.isError = false;

			// Hack for radio/checkbox group button, the validation go into the
			// first radio/checkbox of the group
			var fieldType = field.prop("type");

			if ((fieldType == "radio" || fieldType == "checkbox") && form.find("input[name='" + fieldName + "']").size() > 1) {
				field = $(form.find("input[name='" + fieldName + "'][type!=hidden]:first"));
				options.showArrow = false;
			}

			if (fieldType == "text" && form.find("input[name='" + fieldName + "']").size() > 1) {
				field = $(form.find("input[name='" + fieldName + "'][type!=hidden]:first"));
				options.showArrow = false;
			}

			if (options.isError){
				methods._showPrompt(field, promptText, "", false, options);
			}else{
				if (!isAjaxValidator) methods._closePrompt(field);
			}

			if (!isAjaxValidator) {
				field.trigger("jqv.field.result", [field, options.isError, promptText]);
			}

			/* Record error */
			var errindex = $.inArray(field[0], options.InvalidFields);
			if (errindex == -1) {
				if (options.isError)
				options.InvalidFields.push(field[0]);
			} else if (!options.isError) {
				options.InvalidFields.splice(errindex, 1);
			}

			return options.isError;
		},
		/**
		* Required validation
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return an error string if validation failed
		*/
		_required: function(field, rules, i, options) {
			switch (field.prop("type")) {
				case "text":
				case "password":
				case "textarea":
				case "file":
				default:

					if (! $.trim(field.val()) || field.val() == field.attr("data-validation-placeholder"))
						return options.allrules[rules[i]].alertText;
					break;
				case "radio":
				case "checkbox":
					var form = field.closest("form");
					var name = field.attr("name");
					if (form.find("input[name='" + name + "']:checked").size() == 0) {
						if (form.find("input[name='" + name + "']").size() == 1)
							return options.allrules[rules[i]].alertTextCheckboxe;
						else
							return options.allrules[rules[i]].alertTextCheckboxMultiple;
					}
					break;
				// required for <select>
				case "select-one":
					// added by paul@kinetek.net for select boxes, Thank you
					if (!field.val())
						return options.allrules[rules[i]].alertText;
					break;
				case "select-multiple":
					// added by paul@kinetek.net for select boxes, Thank you
					if (!field.find("option:selected").val())
						return options.allrules[rules[i]].alertText;
			}
		},
		/**
		* Validate that 1 from the group field is required
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return an error string if validation failed
		*/
		_groupRequired: function(field, rules, i, options) {
			var classGroup = "["+options.validateAttribute+"*=" +rules[i + 1] +"]";
			var isValid = false;
			// Check all fields from the group
			field.closest("form").find(classGroup).each(function(){
				if(!methods._required($(this), rules, i, options)){
					isValid = true;
					return false;
				}
			})

			if(!isValid) return options.allrules[rules[i]].alertText;
		},
		/**
		* Validate Regex rules
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return an error string if validation failed
		*/
		_customRegex: function(field, rules, i, options) {
			var customRule = rules[i + 1];
			var rule = options.allrules[customRule];
			if(!rule) {
				alert("jqv:custom rule not found "+customRule);
				return;
			}

			var ex=rule.regex;
			if(!ex) {
				alert("jqv:custom regex not found "+customRule);
				return;
			}
			var pattern = new RegExp(ex);

			if (!pattern.test(field.val()))
				return options.allrules[customRule].alertText;
		},
		/**
		* Validate custom function outside of the engine scope
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return an error string if validation failed
		*/
		_funcCall: function(field, rules, i, options) {
			var functionName = rules[i + 1];
			var fn;
			if(functionName.indexOf('.')>-1)
			{
				var namespaces = functionName.split('.');
				var scope = window;
				while(namespaces.length)
				{
					scope = scope[namespaces.shift()];
				}
				fn = scope;
			}
			else
				fn = window[functionName] || options.customFunctions[functionName];
			if (typeof(fn) == 'function')
				return fn(field, rules, i, options);

		},
		/**
		* Field match
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return an error string if validation failed
		*/
		_equals: function(field, rules, i, options) {
			var equalsField = rules[i + 1];

			if (field.val() != $("#" + equalsField).val())
				return options.allrules.equals.alertText;
		},
		/**
		* Check the maximum size (in characters)
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return an error string if validation failed
		*/
		_maxSize: function(field, rules, i, options) {
			var max = rules[i + 1];
			var len = field.val().length;

			if (len > max) {
				var rule = options.allrules.maxSize;
				return rule.alertText + max + rule.alertText2;
			}
		},
		/**
		* Check the minimum size (in characters)
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return an error string if validation failed
		*/
		_minSize: function(field, rules, i, options) {
			var min = rules[i + 1];
			var len = field.val().length;

			if (len < min) {
				var rule = options.allrules.minSize;
				return rule.alertText + min + rule.alertText2;
			}
		},
		/**
		* Check number minimum value
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return an error string if validation failed
		*/
		_min: function(field, rules, i, options) {
			var min = parseFloat(rules[i + 1]);
			var len = parseFloat(field.val());

			if (len < min) {
				var rule = options.allrules.min;
				if (rule.alertText2) return rule.alertText + min + rule.alertText2;
				return rule.alertText + min;
			}
		},
		/**
		* Check number maximum value
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return an error string if validation failed
		*/
		_max: function(field, rules, i, options) {
			var max = parseFloat(rules[i + 1]);
			var len = parseFloat(field.val());

			if (len >max ) {
				var rule = options.allrules.max;
				if (rule.alertText2) return rule.alertText + max + rule.alertText2;
				//orefalo: to review, also do the translations
				return rule.alertText + max;
			}
		},
		/**
		* Checks date is in the past
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return an error string if validation failed
		*/
		_past: function(field, rules, i, options) {

			var p=rules[i + 1];
			var pdate = (p.toLowerCase() == "now")? new Date():methods._parseDate(p);
			var vdate = methods._parseDate(field.val());

			if (vdate > pdate ) {
				var rule = options.allrules.past;
				if (rule.alertText2) return rule.alertText + methods._dateToString(pdate) + rule.alertText2;
				return rule.alertText + methods._dateToString(pdate);
			}
		},
		/**
		* Checks date is in the future
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return an error string if validation failed
		*/
		_future: function(field, rules, i, options) {

			var p=rules[i + 1];
			var pdate = (p.toLowerCase() == "now")? new Date():methods._parseDate(p);
			var vdate = methods._parseDate(field.val());

			if (vdate < pdate ) {
				var rule = options.allrules.future;
				if (rule.alertText2)
					return rule.alertText + methods._dateToString(pdate) + rule.alertText2;
				return rule.alertText + methods._dateToString(pdate);
			}
		},
		/**
		* Checks if valid date
		*
		* @param {string} date string
		* @return a bool based on determination of valid date
		*/
		_isDate: function (value) {
			var dateRegEx = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/);
			return dateRegEx.test(value);
		},
		/**
		* Checks if valid date time
		*
		* @param {string} date string
		* @return a bool based on determination of valid date time
		*/
		_isDateTime: function (value){
			var dateTimeRegEx = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/);
			return dateTimeRegEx.test(value);
		},
		//Checks if the start date is before the end date
		//returns true if end is later than start
		_dateCompare: function (start, end) {
			return (new Date(start.toString()) < new Date(end.toString()));
		},
		/**
		* Checks date range
		*
		* @param {jqObject} first field name
		* @param {jqObject} second field name
		* @return an error string if validation failed
		*/
		_dateRange: function (first, second, rules, i, options) {
			//are not both populated
			if ((!first[0].value && second[0].value) || (first[0].value && !second[0].value)) {
				return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
			}

			//are not both dates
			if (!methods._isDate(first[0].value) || !methods._isDate(second[0].value)) {
				return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
			}

			//are both dates but range is off
			if (!methods._dateCompare(first[0].value, second[0].value)) {
				return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
			}
		},
		/**
		* Checks date time range
		*
		* @param {jqObject} first field name
		* @param {jqObject} second field name
		* @return an error string if validation failed
		*/
		_dateTimeRange: function (first, second, rules, i, options) {
			//are not both populated
			if ((!first[0].value && second[0].value) || (first[0].value && !second[0].value)) {
				return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
			}
			//are not both dates
			if (!methods._isDateTime(first[0].value) || !methods._isDateTime(second[0].value)) {
				return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
			}
			//are both dates but range is off
			if (!methods._dateCompare(first[0].value, second[0].value)) {
				return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
			}
		},
		/**
		* Max number of checkbox selected
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return an error string if validation failed
		*/
		_maxCheckbox: function(form, field, rules, i, options) {

			var nbCheck = rules[i + 1];
			var groupname = field.attr("name");
			var groupSize = form.find("input[name='" + groupname + "']:checked").size();
			if (groupSize > nbCheck) {
				options.showArrow = false;
				if (options.allrules.maxCheckbox.alertText2)
					 return options.allrules.maxCheckbox.alertText + " " + nbCheck + " " + options.allrules.maxCheckbox.alertText2;
				return options.allrules.maxCheckbox.alertText;
			}
		},
		/**
		* Min number of checkbox selected
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return an error string if validation failed
		*/
		_minCheckbox: function(form, field, rules, i, options) {

			var nbCheck = rules[i + 1];
			var groupname = field.attr("name");
			var groupSize = form.find("input[name='" + groupname + "']:checked").size();
			if (groupSize < nbCheck) {
				options.showArrow = false;
				return options.allrules.minCheckbox.alertText + " " + nbCheck + " " + options.allrules.minCheckbox.alertText2;
			}
		},
		/**
		* Checks that it is a valid credit card number according to the
		* Luhn checksum algorithm.
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return an error string if validation failed
		*/
		_creditCard: function(field, rules, i, options) {
			//spaces and dashes may be valid characters, but must be stripped to calculate the checksum.
			var valid = false, cardNumber = field.val().replace(/ +/g, '').replace(/-+/g, '');

			var numDigits = cardNumber.length;
			if (numDigits >= 14 && numDigits <= 16 && parseInt(cardNumber) > 0) {

				var sum = 0, i = numDigits - 1, pos = 1, digit, luhn = new String();
				do {
					digit = parseInt(cardNumber.charAt(i));
					luhn += (pos++ % 2 == 0) ? digit * 2 : digit;
				} while (--i >= 0)

				for (i = 0; i < luhn.length; i++) {
					sum += parseInt(luhn.charAt(i));
				}
				valid = sum % 10 == 0;
			}
			if (!valid) return options.allrules.creditCard.alertText;
		},
		/**
		* Ajax field validation
		*
		* @param {jqObject} field
		* @param {Array[String]} rules
		* @param {int} i rules index
		* @param {Map}
		*            user options
		* @return nothing! the ajax validator handles the prompts itself
		*/
		 _ajax: function(field, rules, i, options) {

			 var errorSelector = rules[i + 1];
			 var rule = options.allrules[errorSelector];
			 var extraData = rule.extraData;
			 var extraDataDynamic = rule.extraDataDynamic;

			 if (!extraData)
			 	extraData = "";

			 if (extraDataDynamic) {
				 var tmpData = [];
				 var domIds = String(extraDataDynamic).split(",");
				 for (var i = 0; i < domIds.length; i++) {
					 var id = domIds[i];
					 if ($(id).length) {
						 var inputValue = field.closest("form").find(id).val();
						 var keyValue = id.replace('#', '') + '=' + escape(inputValue);
						 tmpData.push(keyValue);
					 }
				 }
				 extraDataDynamic = tmpData.join("&");
			 } else {
				 extraDataDynamic = "";
			 }

			 if (!options.isError) {
				 $.ajax({
					 type: "GET",
					 url: rule.url,
					 cache: false,
					 dataType: "json",
					 data: "fieldId=" + field.attr("id") + "&fieldValue=" + field.val() + "&extraData=" + extraData + "&" + extraDataDynamic,
					 field: field,
					 rule: rule,
					 methods: methods,
					 options: options,
					 beforeSend: function() {
						 // build the loading prompt
						 var loadingText = rule.alertTextLoad;
						 if (loadingText)
						 	methods._showPrompt(field, loadingText, "load", true, options);
					 },
					 error: function(data, transport) {
						 methods._ajaxError(data, transport);
					 },
					 success: function(json) {

						 // asynchronously called on success, data is the json answer from the server
						 var errorFieldId = json[0];
						 //var errorField = $($("#" + errorFieldId)[0]);
						 var errorField = $($("input[id='" + errorFieldId +"']")[0]);

						 // make sure we found the element
						 if (errorField.length == 1) {
							 var status = json[1];
							 // read the optional msg from the server
							 var msg = json[2];
							 if (!status) {
								 // Houston we got a problem - display an red prompt
								 options.ajaxValidCache[errorFieldId] = false;
								 options.isError = true;

								 // resolve the msg prompt
								 if(msg) {
									 if (options.allrules[msg]) {
										 var txt = options.allrules[msg].alertText;
										 if (txt)
										 	msg = txt;
									 }
								 }
								 else
								 	msg = rule.alertText;

								 methods._showPrompt(errorField, msg, "", true, options);
							 } else {
								 if (options.ajaxValidCache[errorFieldId] !== undefined)
								 	options.ajaxValidCache[errorFieldId] = true;

								 // resolves the msg prompt
								 if(msg) {
									 if (options.allrules[msg]) {
										 var txt = options.allrules[msg].alertTextOk;
										 if (txt)
										 	msg = txt;
									 }
								 }
								 else
								 msg = rule.alertTextOk;

								 // see if we should display a green prompt
								 if (msg)
								 	methods._showPrompt(errorField, msg, "pass", true, options);
								 else
								 	methods._closePrompt(errorField);
							 }
						 }
						 errorField.trigger("jqv.field.result", [errorField, options.isError, msg]);
					 }
				 });
			 }
		 },
		/**
		* Common method to handle ajax errors
		*
		* @param {Object} data
		* @param {Object} transport
		*/
		_ajaxError: function(data, transport) {
			if(data.status == 0 && transport == null)
				alert("The page is not served from a server! ajax call failed");
			else if(typeof console != "undefined")
				console.log("Ajax error: " + data.status + " " + transport);
		},
		/**
		* date -> string
		*
		* @param {Object} date
		*/
		_dateToString: function(date) {
			return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		},
		/**
		* Parses an ISO date
		* @param {String} d
		*/
		_parseDate: function(d) {

			var dateParts = d.split("-");
			if(dateParts==d)
				dateParts = d.split("/");
			return new Date(dateParts[0], (dateParts[1] - 1) ,dateParts[2]);
		},
		/**
		* Builds or updates a prompt with the given information
		*
		* @param {jqObject} field
		* @param {String} promptText html text to display type
		* @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
		* @param {boolean} ajaxed - use to mark fields than being validated with ajax
		* @param {Map} options user options
		*/
		 _showPrompt: function(field, promptText, type, ajaxed, options, ajaxform) {
			 var prompt = methods._getPrompt(field);
			 // The ajax submit errors are not see has an error in the form,
			 // When the form errors are returned, the engine see 2 bubbles, but those are ebing closed by the engine at the same time
			 // Because no error was found befor submitting
			 if(ajaxform) prompt = false;
			 if (prompt)
			 	methods._updatePrompt(field, prompt, promptText, type, ajaxed, options);
			 else
			 	methods._buildPrompt(field, promptText, type, ajaxed, options);
		 },
		/**
		* Builds and shades a prompt for the given field.
		*
		* @param {jqObject} field
		* @param {String} promptText html text to display type
		* @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
		* @param {boolean} ajaxed - use to mark fields than being validated with ajax
		* @param {Map} options user options
		*/
		_buildPrompt: function(field, promptText, type, ajaxed, options) {

			// create the prompt
			var prompt = $('<div>');
			prompt.addClass(methods._getClassName(field.attr("id")) + "formError");
			// add a class name to identify the parent form of the prompt
			if(field.is(":input"))
				prompt.addClass("parentForm"+methods._getClassName(field.parents('form').attr("id")));
			prompt.addClass("formError");

			switch (type) {
				case "pass":
					prompt.addClass("greenPopup");
					break;
				case "load":
					prompt.addClass("blackPopup");
					break;
				default:
					/* it has error  */
					//alert("unknown popup type:"+type);
			}
			if (ajaxed)
				prompt.addClass("ajaxed");

			// create the prompt content
			var promptContent = $('<div>').addClass("formErrorContent").html(promptText).appendTo(prompt);
			// create the css arrow pointing at the field
			// note that there is no triangle on max-checkbox and radio
			if (options.showArrow) {
				var arrow = $('<div>').addClass("formErrorArrow");

				//prompt positioning adjustment support. Usage: positionType:Xshift,Yshift (for ex.: bottomLeft:+20 or bottomLeft:-20,+10)
				var positionType=field.data("promptPosition") || options.promptPosition;
				if (typeof(positionType)=='string') 
				{
					var pos=positionType.indexOf(":");
				 	if(pos!=-1)
						positionType=positionType.substring(0,pos);
				}

				switch (positionType) {
					case "bottomLeft":
					case "bottomRight":
						prompt.find(".formErrorContent").before(arrow);
						arrow.addClass("formErrorArrowBottom").html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
						break;
					case "topLeft":
					case "topRight":
						arrow.html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');
						prompt.append(arrow);
						break;
				}
			}
			// Modify z-indexes  for jquery ui
			if (field.closest('.ui-dialog').length)
				prompt.addClass('formErrorInsideDialog');

			prompt.css({
				"opacity": 0,
				'position':'absolute'
			});
			field.before(prompt);
			
			var pos = methods._calculatePosition(field, prompt, options);
			prompt.css({
				"top": pos.callerTopPosition,
				"left": pos.callerleftPosition,
				"marginTop": pos.marginTopSize,
				"opacity": 0
			}).data("callerField", field);

			if (options.autoHidePrompt) {
				setTimeout(function(){
					prompt.animate({
						"opacity": 0
					},function(){
						prompt.closest('.formErrorOuter').remove();
						prompt.remove();
					});
				}, options.autoHideDelay);
			} 
			return prompt.animate({
				"opacity": 0.87
			});
		},
		/**
		* Updates the prompt text field - the field for which the prompt
		* @param {jqObject} field
		* @param {String} promptText html text to display type
		* @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
		* @param {boolean} ajaxed - use to mark fields than being validated with ajax
		* @param {Map} options user options
		*/
		_updatePrompt: function(field, prompt, promptText, type, ajaxed, options, noAnimation) {

			if (prompt) {
				if (typeof type !== "undefined") {
					if (type == "pass")
						prompt.addClass("greenPopup");
					else
						prompt.removeClass("greenPopup");

					if (type == "load")
						prompt.addClass("blackPopup");
					else
						prompt.removeClass("blackPopup");
				}
				if (ajaxed)
					prompt.addClass("ajaxed");
				else
					prompt.removeClass("ajaxed");

				prompt.find(".formErrorContent").html(promptText);

				var pos = methods._calculatePosition(field, prompt, options);
				var css = {"top": pos.callerTopPosition,
				"left": pos.callerleftPosition,
				"marginTop": pos.marginTopSize};

				if (noAnimation)
					prompt.css(css);
				else
					prompt.animate(css);
			}
		},
		/**
		* Closes the prompt associated with the given field
		*
		* @param {jqObject}
		*            field
		*/
		 _closePrompt: function(field) {
			 var prompt = methods._getPrompt(field);
			 if (prompt)
				 prompt.fadeTo("fast", 0, function() {
					 prompt.parent('.formErrorOuter').remove();
					 prompt.remove();
				 });
		 },
		 closePrompt: function(field) {
			 return methods._closePrompt(field);
		 },
		/**
		* Returns the error prompt matching the field if any
		*
		* @param {jqObject}
		*            field
		* @return undefined or the error prompt (jqObject)
		*/
		_getPrompt: function(field) {
            var formId = $(field).closest('form').attr('id');
			var className = methods._getClassName(field.attr("id")) + "formError";
            var match = $("." + methods._escapeExpression(className) + '.parentForm' + formId)[0];
			if (match)
			return $(match);
		},
		/**
		  * Returns the escapade classname
		  *
		  * @param {selector}
		  *            className
		  */
		  _escapeExpression: function (selector) {
			  return selector.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1");
		  },
		/**
		 * returns true if we are in a RTLed document
		 *
		 * @param {jqObject} field
		 */
		isRTL: function(field)
		{
			var $document = $(document);
			var $body = $('body');
			var rtl =
				(field && field.hasClass('rtl')) ||
				(field && (field.attr('dir') || '').toLowerCase()==='rtl') ||
				$document.hasClass('rtl') ||
				($document.attr('dir') || '').toLowerCase()==='rtl' ||
				$body.hasClass('rtl') ||
				($body.attr('dir') || '').toLowerCase()==='rtl';
			return Boolean(rtl);
		},
		/**
		* Calculates prompt position
		*
		* @param {jqObject}
		*            field
		* @param {jqObject}
		*            the prompt
		* @param {Map}
		*            options
		* @return positions
		*/
		_calculatePosition: function (field, promptElmt, options) {

			var promptTopPosition, promptleftPosition, marginTopSize;
			var fieldWidth 	= field.width();
			var fieldLeft 	= field.position().left 
			var fieldTop 	=  field.position().top;
			var fieldHeight 	=  field.height();	
			var promptHeight = promptElmt.height();


			// is the form contained in an overflown container?
			promptTopPosition = promptleftPosition = 0;
			// compensation for the arrow
			marginTopSize = -promptHeight;
		

			//prompt positioning adjustment support
			//now you can adjust prompt position
			//usage: positionType:Xshift,Yshift
			//for example:
			//   bottomLeft:+20 means bottomLeft position shifted by 20 pixels right horizontally
			//   topRight:20, -15 means topRight position shifted by 20 pixels to right and 15 pixels to top
			//You can use +pixels, - pixels. If no sign is provided than + is default.
			var positionType=field.data("promptPosition") || options.promptPosition;
			var shift1="";
			var shift2="";
			var shiftX=0;
			var shiftY=0;
			if (typeof(positionType)=='string') {
				//do we have any position adjustments ?
				if (positionType.indexOf(":")!=-1) {
					shift1=positionType.substring(positionType.indexOf(":")+1);
					positionType=positionType.substring(0,positionType.indexOf(":"));

					//if any advanced positioning will be needed (percents or something else) - parser should be added here
					//for now we use simple parseInt()

					//do we have second parameter?
					if (shift1.indexOf(",")!=-1) {
						shift2=shift1.substring(shift1.indexOf(",")+1);
						shift1=shift1.substring(0,shift1.indexOf(","));
						shiftY=parseInt(shift2);
						if (isNaN(shiftY)) shiftY=0;
					};

					shiftX=parseInt(shift1);
					if (isNaN(shift1)) shift1=0;

				};
			};

			
			switch (positionType) {
				default:
				case "topRight":
					promptleftPosition +=  fieldLeft + fieldWidth - 30;
					promptTopPosition +=  fieldTop;
					break;

				case "topLeft":
					promptTopPosition +=  fieldTop;
					promptleftPosition += fieldLeft
					break;

				case "centerRight":
					promptTopPosition = fieldTop+4;
					marginTopSize = 0;
					promptleftPosition= fieldLeft + field.outerWidth(1)+5;
					break;
				case "centerLeft":
					promptleftPosition = fieldLeft - (promptElmt.width() + 2);
					promptTopPosition = fieldTop+4;
					marginTopSize = 0;
					
					break;

				case "bottomLeft":
					promptTopPosition = fieldTop + field.height() + 5;
					marginTopSize = 0;
					promptleftPosition = fieldLeft;
					break;
				case "bottomRight":
					promptleftPosition = fieldLeft + fieldWidth - 30;
					promptTopPosition =  fieldTop +  field.height() + 5;
					marginTopSize = 0;
			}
		

			//apply adjusments if any
			promptleftPosition += shiftX;
			promptTopPosition  += shiftY;

			return {
				"callerTopPosition": promptTopPosition + "px",
				"callerleftPosition": promptleftPosition + "px",
				"marginTopSize": marginTopSize + "px"
			};
		},
		/**
		* Saves the user options and variables in the form.data
		*
		* @param {jqObject}
		*            form - the form where the user option should be saved
		* @param {Map}
		*            options - the user options
		* @return the user options (extended from the defaults)
		*/
		 _saveOptions: function(form, options) {

			 // is there a language localisation ?
			 if ($.validationEngineLanguage)
			 var allRules = $.validationEngineLanguage.allRules;
			 else
			 $.error("jQuery.validationEngine rules are not loaded, plz add localization files to the page");
			 // --- Internals DO NOT TOUCH or OVERLOAD ---
			 // validation rules and i18
			 $.validationEngine.defaults.allrules = allRules;

			 var userOptions = $.extend(true,{},$.validationEngine.defaults,options);

			 form.data('jqv', userOptions);
			 return userOptions;
		 },

		 /**
		 * Removes forbidden characters from class name
		 * @param {String} className
		 */
		 _getClassName: function(className) {
			 if(className)
				 return className.replace(/:/g, "_").replace(/\./g, "_");
		 }
	 };

	 /**
	 * Plugin entry point.
	 * You may pass an action as a parameter or a list of options.
	 * if none, the init and attach methods are being called.
	 * Remember: if you pass options, the attached method is NOT called automatically
	 *
	 * @param {String}
	 *            method (optional) action
	 */
	 $.fn.validationEngine = function(method) {

		 var form = $(this);
		 if(!form[0]) return false;  // stop here if the form does not exist

		 if (typeof(method) == 'string' && method.charAt(0) != '_' && methods[method]) {

			 // make sure init is called once
			 if(method != "showPrompt" && method != "hide" && method != "hideAll")
			 methods.init.apply(form);

			 return methods[method].apply(form, Array.prototype.slice.call(arguments, 1));
		 } else if (typeof method == 'object' || !method) {

			 // default constructor with or without arguments
			 methods.init.apply(form, arguments);
			 return methods.attach.apply(form);
		 } else {
			 $.error('Method ' + method + ' does not exist in jQuery.validationEngine');
		 }
	};



	// LEAK GLOBAL OPTIONS
	$.validationEngine= {fieldIdCounter: 0,defaults:{

		// Name of the event triggering field validation
		validationEventTrigger: "blur",
		// Automatically scroll viewport to the first error
		scroll: true,
		// Focus on the first input
		focusFirstField:true,
		// Opening box position, possible locations are: topLeft,
		// topRight, bottomLeft, centerRight, bottomRight
		promptPosition: "topRight",
		bindMethod:"bind",
		// internal, automatically set to true when it parse a _ajax rule
		inlineAjax: false,
		// if set to true, the form data is sent asynchronously via ajax to the form.action url (get)
		ajaxFormValidation: false,
		// Ajax form validation callback method: boolean onComplete(form, status, errors, options)
		// retuns false if the form.submit event needs to be canceled.
		ajaxFormValidationURL: false,
		// The url to send the submit ajax validation (default to action)
		onAjaxFormComplete: $.noop,
		// called right before the ajax call, may return false to cancel
		onBeforeAjaxFormValidation: $.noop,
		// Stops form from submitting and execute function assiciated with it
		onValidationComplete: false,

		// Used when you have a form fields too close and the errors messages are on top of other disturbing viewing messages
		doNotShowAllErrosOnSubmit: false,

		// true if you want to vind the input fields
		binded: true,
		// set to true, when the prompt arrow needs to be displayed
		showArrow: true,
		// did one of the validation fail ? kept global to stop further ajax validations
		isError: false,
		// Caches field validation status, typically only bad status are created.
		// the array is used during ajax form validation to detect issues early and prevent an expensive submit
		ajaxValidCache: {},
		// Auto update prompt position after window resize
		autoPositionUpdate: false,

		InvalidFields: [],
		onSuccess: false,
		onFailure: false,
		// Auto-hide prompt
		autoHidePrompt: false,
		// Delay before auto-hide
		autoHideDelay: 10000,
		// Fade out duration while hiding the validations
		fadeDuration: 0.3
	}};
	$(function(){$.validationEngine.defaults.promptPosition = methods.isRTL()?'topLeft':"topRight"});
})(jQuery);;(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* This field is required",
                    "alertTextCheckboxMultiple": "* Please select an option",
                    "alertTextCheckboxe": "* This checkbox is required",
                    "alertTextDateRange": "* Both date range fields are required"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "* Invalid ",
                    "alertText2": "Date Range"
                },
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "* Invalid ",
                    "alertText2": "Date Time Range"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* Minimum ",
                    "alertText2": " characters allowed"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* Maximum ",
                    "alertText2": " characters allowed"
                },
                "groupRequired": {
                    "regex": "none",
                    "alertText": "* You must fill one of the following fields"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* Minimum value is "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* Maximum value is "
                },
                "past": {
                    "regex": "none",
                    "alertText": "* Date prior to "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* Date past "
                },  
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* Maximum ",
                    "alertText2": " options allowed"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* Please select ",
                    "alertText2": " options"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* Fields do not match"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* Invalid credit card number"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
                    "alertText": "* Invalid phone number"
                },
                "email": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    "alertText": "* Invalid email address"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* Not a valid integer"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
                    "alertText": "* Invalid floating decimal number"
                },
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText": "* Invalid date, must be in YYYY-MM-DD format"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* Invalid IP address"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* Invalid URL"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* Numbers only"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* Letters only"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "* No special characters allowed"
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* This username is available",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* This name is already taken",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* This name is available",
                    // speaks by itself
                    "alertTextLoad": "* Validating, please wait"
                },
                 "ajaxNameCallPhp": {
                        // remote json service location
                        "url": "phpajax/ajaxValidateFieldName.php",
                        // error
                        "alertText": "* This name is already taken",
                        // speaks by itself
                        "alertTextLoad": "* Validating, please wait"
                    },
                "validate2fields": {
                    "alertText": "* Please input HELLO"
                },
                //tls warning:homegrown not fielded 
                "dateFormat":{
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "* Invalid Date"
                },
                //tls warning:homegrown not fielded 
                "dateTimeFormat": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "* Invalid Date or Date Format",
                    "alertText2": "Expected Format: ",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM or ", 
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
                }
            };
            
        }
    };

    $.validationEngineLanguage.newLang();
    
})(jQuery);