$(function(){const t="[data-js=add-button]",e="[data-js=delete-button]",a="[data-js=list-container]",s="[data-js=list-item]",l="[data-js=list-checkbox]",n="click",o="change",c=$("body"),i=$(a);let d=0;c.on(n,t,function(){i.append('<li class="list-group-item" data-js="list-item"><label class="list-label"><input type="checkbox" class="list-label__checkbox" data-js="list-checkbox" /><span>ITEM'+ ++d+'</span></label><button type="button" class="btn badge-danger" data-js="delete-button">delete</button></li>')}).on(n,e,function(t){$(t.target).closest(s).remove()}).on(o,l,function(t){const e=$(t.target),a=e.closest(s),l="list-group-item--active";e.prop("checked")?a.addClass(l):a.removeClass(l)})});