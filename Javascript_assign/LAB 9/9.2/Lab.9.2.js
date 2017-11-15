function check()
{
    alert("HI");
}

function ValidateForm(formObj) 
{
    var validForm = true;
    var nameElement = formObj.txtName;
    var phElement = formObj.phNo;
    var emailElement = formObj.eMail;
    var gradElement = formObj.rdgrad;
    var qualElement = formObj.ddlQual;

    validForm = IsBlank(nameElement, "Enter the name");
    if (validForm == false)
        return false;

    validForm = IsValid(nameElement, /^[a-z]{2,15}$/i, "Only 2-15 are allowed");
    if (validForm == false)
        return false;

    validForm = IsBlank(phElement, "Enter your Phone Number");
    if (validForm == false)
        return false;

    validForm = IsValid(phElement, /^\d{10}$/, "Enter correct Phone Number");
    if (validForm == false)
        return false;

    validForm = IsBlank(emailElement, "Enter email");
    if (validForm == false)
        return false;

    validForm = IsValid(emailElement, /^\w+(\.\w+)?@\w+(\.\w{2,3}){1,2}$/, "Enter valid email");
    if (validForm == false)
        return false;

    validForm = IsChecked(gradElement, "Select a graduate level");
    if (validForm == false)
        return false;

    validForm = IsSelected(qualElement, "Select a qualification");
    if (validForm == false) 
        return false;
    

    if (validForm)
        alert("Form is Valid");
    return validForm;
}

function showPreview(form)
{
    if(ValidateForm(form))
    {
        var win = open("","formwin","width=300","height=300","location=0")
        with(win.document)
        {
            write("<h1>Details of the Person are</h1>");
            write("<b>Name:</b>");
            write(form.txtName.value +"<br/>");
            write("<b>DOB:</b>");
            write(form.DoB.value +"<br/>");
            write("<b>Phone Number:</b>");
            write(form.phNo.value +"<br/>");
            write("<b>Email:</b>");
            write(form.eMail.value + "<br/>");
            write("<b>Graduation :</b>");
            write(document.querySelector('input[name="rdgrad"]:checked').value + "<br/><br/>");
            write("<b>Qualification:</b>");
            write(form.ddlQual.value + "<br/><br/>");          
        }
    }
}

function IsBlank(formElement,errormessage)
{
    var validElement = true;
    if(formElement.value == "")
    {
        alert(errormessage);
        formElement.focus();
        validElement = false;
    }
    return validElement;
}

function IsValid(formElement,pattern,errormessage)
{
    var validElement = true;
    if(pattern.test(formElement.value)== false)
    {
		alert(errormessage);
		formElement.focus();
		formElement.value = "";
		validElement = false;
	}
	return validElement;
}

function IsChecked(formElement, errormessage) 
{
    var validElement = true;
    var status = false;
    for (counter = 0; counter < formElement.length; counter++) {
        if (formElement[counter].checked) {
            status = true;
            break;
        }
    }
    if (status === false) {
        alert(errormessage);
        formElement[0].focus();
        validElement = false;
    }
    return validElement;
}

function IsSelected(formElement, errormessage) 
{
    var validElement = true;

    if (formElement.selectedIndex == 0 && formElement[0].value == -1) {
        alert(errormessage);
        formElement[0].focus();
        validElement = false;
    }
    return validElement;
}

function fillCourse(course) 
{
    var qualElement = document.form.ddlQual;
    var domElement = document.createElement('option');
    var attr = document.createAttribute('value');
    var textElement = document.createTextNode(course);
    domElement.appendChild(textElement);
    attr.value = course;
    domElement.attributes.setNamedItem(attr);
    qualElement.appendChild(domElement);
}

function clearItems(qualElement) 
{
    var itemsCount = qualElement.length;
    for (counter = itemsCount; counter > 0; counter--) {
        var item = qualElement[counter - 1];
        qualElement.removeChild(item);
    }
}

function QualSelect(gradType, qualElement) 
{
    var ugCourses = ['Select your UG course', 'B.Tech', 'B.Com', 'B.Sc', 'B.C.A', 'B.A', 'B.E'];
    var pgCourses = ['Select your PG course', 'M.Tech', 'M.Com', 'M.Sc', 'M.C.A', 'M.A', 'M.E'];
    clearItems(qualElement);
    if (gradType.toLowerCase() == "ug")
        ugCourses.forEach(fillCourse);
    else
        pgCourses.forEach(fillCourse);
    qualElement.children[0].attributes[0].value = "-1";
}

/*function IsChecked(formElement,errormessage) 
{
    var validElement = true;
    if (!(document.getElementsByName("grad").checked))
    {
        alert(errormessage);
        formElement.focus();
        validElement = false;
    }
    else
        return validElement;
}

function isRadioButtonSelected()
{
    var grad = document.getElementByName("grad");
    var is_checked = false;
    var num;
    for(i=0;i<grad.length;i++)
    {
        if(grad[i].checked)
        {
            is_checked = true;
            num = i;
            break;
        }
    }

    if(!is_checked)
        alert("Select the graduation");
    else
    {
        if(num == 0)
            document.getElementById("qual").innerHTML = "<option value="B.Sc">B.Sc</option><option value="B.Tech">B.Tech</option><option value="B.E.">B.E.</option><option value="B.Com">B.Com</option>";

        if(num == 1)
            document.getElementById("qual").innerHTML = "<option value="M.Sc">M.Sc</option><option value="M.Tech">M.Tech</option><option value="M.E.">M.E.</option><option value="M.Com">M.Com</option>";
    }
    return is_checked;
}

function QualSelect(selection) 
{
    var dropdown = document.getElementById("op");
    switch (selection.value) 
    {
        case 'rdUG':
            {
                dropdown.options.length = 0;
                dropdown.options[dropdown.options.length] = new Option('Select One', '0');
                dropdown.options[dropdown.options.length] = new Option('B.Tech', 'B.Tech');
                dropdown.options[dropdown.options.length] = new Option('B.E.', 'B.E.');
                dropdown.options[dropdown.options.length] = new Option('B.Com', 'B.Com');
                break;
            }
        case 'rdPG':
            {
                dropdown.options.length = 0;
                dropdown.options[dropdown.options.length] = new Option('Select One', '0');
                dropdown.options[dropdown.options.length] = new Option('M.Tech', 'M.Tech');
                dropdown.options[dropdown.options.length] = new Option('M.E.', 'M.E.');
                dropdown.options[dropdown.options.length] = new Option('M.Com', 'M.Com');
                break;
            }
    }
}
*/