const FormJS = (() => {
  const classes = {
    Form: class {

      form = document.createElement('form');
      data = undefined;

      init = ({ action, method, label }) => {
        if (method.toString().toUpperCase() === "POST") throw new Error("Could not handle post request. Coming Soon!")

        const labelElem = document.createElement('h2');
        labelElem.appendChild(document.createTextNode(label ? label : "FormJS Form"));
        labelElem.style.fontWeight = "100";

        this.form.setAttribute('action', action);
        this.form.setAttribute('method', method.toString().toUpperCase());
        this.form.appendChild(labelElem);
        document.body.appendChild(this.form);
      }

      fields = (fields = "Optional fields are to be identified with a ? at the beginning") => {
        if (typeof fields != "object") throw "Error: Acceptable type is only 'Array'";

        fields.map(field => {
          if (field != "submit" ) {
            var inputBox = document.createElement('input');
            
            if (field.toString().search(":") < 0) {
              inputBox.setAttribute('required', '');
            }


            field = field.toString().replace(":", "");
            inputBox.setAttribute('type', field);
            
            this.form.appendChild(inputBox);
          } 
        });
      };

      setFetchTags = (tags = []) => {
        var formChild = this.form.children;
        var idx = 0;

        tags.map(tag => {
          formChild[idx + 1].setAttribute('name', tag);
          idx++;
        });
      }

      setPlaceholder = (tags = []) => {
        var formChild = this.form.children;
        var idx = 0;

        tags.map(tag => {
          formChild[idx + 1].setAttribute('placeholder', tag);
          idx++;
        });
      }

      configButton = (displayName, listener = (btn) => {}) => {
        var inputBox = document.createElement('input');
        inputBox.setAttribute('type', 'submit');
        inputBox.setAttribute('value', displayName ? displayName : "submit");

        this.form.appendChild(inputBox);

        return (() => {
          listener(inputBox);
        })();
      }


      formData = () => {
        const children = this.form.children;
        let dataSendable = {}
        let data = [];


        for (var child of children) {
          if (child.getAttribute('type') != "submit") {
            data.push(child.value);
          }
        };

        dataSendable = Object.assign(dataSendable, data);
        
        var options= [];
        options.push(dataSendable);
        options.push(data);

        return options;
      }
    },

    FormDesignController : class {
      form;

      init(form) {
        this.form = form;
        this.design();
      }

      design() {
        var styles = this.form.style;
        styles.padding = "10px";
        styles.borderColor = "#000";
        styles.borderStyle = "solid";
        styles.borderWidth = "1.5px";
        styles.width =  "450px";
        styles.maxHeight = "700px";
        styles.minHeight = "300px";
        styles.display = "flex";
        styles.justifyContent = "center";
        styles.alignItems = "center";
        styles.flexWrap = "wrap";
        styles.borderRadius =  "10px";

        var children = this.form.children;

        for (var child of children) {
          styles = child.style;
          styles.margin = "10px";
          if (child.getAttribute('type') === "submit") styles.width = "45%";
          else styles.width = "100%";
          styles.outline = "none";
          styles.padding = "5px";
        } 
      }
    },

    classList: class {
      form;

      constructor(form) {
        this.form = form;
      }

      classList({ Form, Submit, TextBox }) {
        var children = this.form.children;

        this.form.setAttribute('class', Form);

        for (var child of children) {
          if (child.getAttribute('type') === "submit") child.setAttribute('class', Submit);
          else child.setAttribute('class', TextBox);
        } 
      }
    }
    
  }

  return classes;
})();
