/*
 * inlineFieldLabel 1.2.0 (UPDATE)
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Date: 2010-09-4 12:22:17 +0200 (Fri, 24 May 2008)
 
 <strong>This plugin allows to input a default text label inside  an input text element or a text area.<strong>

 Very common on search boxes, login forms or any other short forms.

 <h3>Features</h3> 
 <ol>
 <li>When the field gets focus the label disappears.</li>
 <li>When the user submits the form the label is discarded.</li>
 <li>If  the user didn't insert any value after focusing the field - the label returns on blur.</li>
 </ol>

 <h2>Examples</h2>

 Suppose we have this form:
 <code>
 <form  method="post" accept-charset="UTF-8" action="#">
  <input type="text" title="please add your text here" class="form-text" value="" size="15" id="edit-search" maxlength="128">
 </div>
 <input type="submit" class="form-submit" value="Search" id="edit-submit-1" name="op">
 </form>
 </code>

 You can use this script to add the label search inside the form:
 <code>
 $('input#search').inlineFieldLabel();
 </code>

 And recommended for Drupal websites or any other CMS.
 
 <strong>This update fixed some issues:<strong>
 <ul>
 <li>Display the input value if set. It was displayed as empty string if set.</li>
 <li>Fix password issue. It was always generate the cloned password field with the same name which was leading not to send the password input value</li>
 <li>If the field is set to the fieldLabel on submit, clear the field on sumbit form not on button submit to handle cases where submit button is hidden</li>
 <li>Check attribute title instead of forcing label</li>
 </ul>
 */

(function($){
    
    $.fn.inlineFieldLabel = function(options) {
        var opts = $.extend({}, $.fn.inlineFieldLabel.defaults, options);
        // Only textarea ant input text
        this.each(function(){
          $this = $(this);
          var o = $.metadata ? $.extend({}, opts, $this.metadata({type:opts.metadataType, name:opts.metadataName})) : opts;
          var x = $(this).attr("title");
          if(x!=undefined){
            innerFunction($this, x);
          }
            
        });
        // Chain:
        return this;
        
    };
    // plugin defaults
    $.fn.inlineFieldLabel.defaults = {
      label : 'some placeholder',
      metadataType: 'class',
      metadataName: 'metadata',
    };
    
    //private function
    function innerFunction(jqElement, fieldLabel) {
       var textInput = null;
        var clonedTextInput = null;
        var strBefore = "";
        var strAfter = "";
        var counter = 0;
        textInput = jqElement;

       /* add the field label css class to the form field and set the value */
       
       
       if (textInput.attr('type') == 'password') {
         clonedTextInput = textInput.clone();
         strBefore = clonedTextInput.append(textInput.clone().attr('name', null)).html();
         strAfter = strBefore.replace('type="password"', 'type="text"');;
         strAfter.replace('type="password"', 'type="text"');
         textInput.after(strAfter);
         clonedTextInput = textInput.next();
         clonedTextInput.addClass("intra-field-label").val(fieldLabel);
         textInput.hide();
       } else {
         textInput.addClass("intra-field-label").val(fieldLabel);
       }
       
      if(clonedTextInput != null) {
          clonedTextInput.focus(function() {
          textInput.show();
          textInput.trigger('focus');
          clonedTextInput.hide();
        });
      } 
       
       
       
       /* remove the placeholder string when field gets focus */
       textInput.focus(function()
        {
          
           if(this.value == fieldLabel )
           {
             
              textInput.removeClass("intra-field-label").val("");
           };
            
           
        });

       /* add the field label string when field looses focus */
       textInput.blur(function()
        {
           
           if(this.value == "")
           {
             if(clonedTextInput != null) {
               textInput.hide();
               clonedTextInput.show();
             }
             else {
               textInput.addClass("intra-field-label").val(fieldLabel );
             }
             
           };
           
        });
        /* if the field is set to the fieldLabel on submit, clear the field */
        textInput.parents('form:first').submit(function() {
            
            if (clonedTextInput != null) {
              textInput.show();
               clonedTextInput.remove();
            }
            if(textInput.val() == fieldLabel)
             {
                textInput.removeClass("intra-field-label").val("");
             };
         });
       
     }
    
    
    
})(jQuery);




