setTimeout(function()
{

	let site = document.domain;

	let array = [];

	/*--------------Your secret key goes below----------------*/
	
	let secret_key = ""

	let service = ""

	/*--------------Prime Video--------------*/

	if (site == "primevideo.com" || site == "www.primevideo.com")
	{

        let titles = document.getElementsByClassName("a-link-normal dv-core");

        for (i = 0, len = titles.length; i < len; i++)
        {
        	let temp = titles[i]['outerText'].trim();
        	if (temp && temp != "See More")
    		{
	            array.push(temp);

    		}
        }

        let dataJSON = {"Prime" : array};

        service = "prime"

        postJSON(dataJSON, service);

	}

	/*--------------Netflix--------------*/

	else if (site == "netflix.com" || site == "www.netflix.com")
	{

        let titles = document.getElementsByClassName("slider-item");

        for (i = 0, len = titles.length; i < len; i++)
        {
        	let temp = titles[i]['textContent'].trim();
            if (temp)
            {
            	array.push(temp);	
            }
        }

        let dataJSON = {"Netflix" : array};

        service = "netflix"

        postJSON(dataJSON, service);

	}

	/*--------------Post the JSON--------------*/


	function postJSON(dataJSON, service){
	    if(dataJSON)
	    {
	            $.ajax({

	                url: "https://api.myjson.com/bins",
	                type: "POST",
	                data: JSON.stringify(dataJSON),
	                contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                success: function(data, textStatus, jqXHR)
	                {

	                    pingDB(data['uri'].replace('https://api.myjson.com/bins/', ''), service);
	                }

	            })
	    };
	};

	/*--------------Ping database--------------*/


	function pingDB(url, service)
	{
		if(url)
	    {
			$.ajax({
				url: "https://zaaa.herokuapp.com/addjson?key=" + secret_key +"&service=" + service + "&api=" + url,
		        type: 'GET',
			})
	    }
	    console.log("Done! Extension will rest until a page refesh. Thank you for your contribution.")
	}

},6000);