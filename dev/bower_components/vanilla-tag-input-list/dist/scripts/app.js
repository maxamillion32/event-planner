!function(t){"use strict";function e(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function i(i,a,n){e(i),a.forEach(function(e){var a=t.createElement("span");a.appendChild(t.createTextNode(e.value));var s=t.createElement("a");s.setAttribute("href","#"),s.setAttribute("title","Delete"),s.className="vtil-delete",s.setAttribute("onclick",n+'.removeTag("'+e.id+'")'),s.innerHTML='&nbsp;<i class="fa fa-trash-o"></i>',a.appendChild(s),a.className="vtil-tag-wrapper",i.appendChild(a)})}window.VTIL=Object.create(null);var a=new Event("empty-tag");VTIL.prototype={tags:[],addTag:function(){if(""===this.inputElement.value)this.inputElement.dispatchEvent(a);else{var t=new Date;this.tags.push({id:t.toISOString(),value:this.inputElement.value}),i(this.contentElement,this.tags,this.objectPath),this.inputElement.value=""}},removeTag:function(t){for(var e=-1,a=0;a<this.tags.length;++a)if(this.tags[a].id===t){e=a;break}e>-1&&(this.tags.splice(e,1),i(this.contentElement,this.tags,this.objectPath))}}}(document);