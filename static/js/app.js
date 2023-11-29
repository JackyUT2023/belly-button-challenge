// set url
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Get url json data and build the ID options:
d3.json(url).then(function(response) {

    // Use console.log to check what returns from url.
    console.log("url response:",response);

    //Iterate the reponse and extract the names to build dropDownList:
    for (let i = 0; i < [response].length; i++){
        console.log("dropDownList",response.names)
        dropDownList = response.names
    };
    dropDownList.forEach(element => {d3.select("#selDataset").append("option").text(element).property("value", element);});
});

//====================================================================================================================================
// Create demographicInfo function:
function demographicInfo(ID){
    d3.json(url).then(function(response){
        d3.select('#sample-metadata').html("")
        let MetaItem = response.metadata.filter(item =>item.id == ID)
        console.log(MetaItem)
        d3.select('#sample-metadata').append("h6").text(`id: ${MetaItem[0].id}`)
        d3.select('#sample-metadata').append("h6").text(`ethnicity: ${MetaItem[0].ethnicity}`)
        d3.select('#sample-metadata').append("h6").text(`gender:${MetaItem[0].gender}`)
        d3.select('#sample-metadata').append("h6").text(`age: ${MetaItem[0].age}`)
        d3.select('#sample-metadata').append("h6").text(`location: ${MetaItem[0].location}`)
        d3.select('#sample-metadata').append("h6").text(`bbtype: ${MetaItem[0].bbtype}`)
        d3.select('#sample-metadata').append("h6").text(`wfreq: ${MetaItem[0].wfreq}`)
        }) 
};
// //Test function demographicInfo
// demographicInfo(950)

//====================================================================================================================================
// Create barchart function:
function barchart(ID){
    d3.json(url).then(function(response){
        let samples = response.samples.filter(item =>item.id == ID)
        console.log(samples)
        //Remix `otu_ids`,`sample_values`,`otu_labels` data into a new Object
        let RemixObject = []
        for (let i=0;i<=samples[0].otu_ids.length;i++){
            let otu_ids_remix = "OTU " +samples[0].otu_ids[i]+ " "
            let sample_values_remix = samples[0].sample_values[i]
            let otu_labels_remix = samples[0].otu_labels[i]
            let RemixData = {'otu_ids':otu_ids_remix,'sample_values':sample_values_remix,'otu_labels':otu_labels_remix}
            RemixObject.push(RemixData)
        }
        console.log(RemixObject)
        //Sort & Slice
        let sample_values_sort = RemixObject.sort((a,b) => b.sample_values-  a.sample_values);
        console.log(sample_values_sort)
        let slicedData = sample_values_sort.slice(0,10);
        console.log(slicedData);
        slicedData.reverse();

        // Plot the bar chart
        let trace = {
            x: slicedData.map(object => object.sample_values),
            y: slicedData.map(object => object.otu_ids),
            text: slicedData.map(object => object.otu_labels),
            type: "bar",
            orientation: "h"
        };
                      
        let data = [trace];
                      
        let layout = {
            title: "Top 10 OTUs"
        };
                      
        Plotly.newPlot("bar", data, layout);


    })
};
// //Test function barchart
// barchart(940)

//====================================================================================================================================
// Create bubblechart function:
function bubblechart(ID){
    d3.json(url).then(function(response){
        let samples = response.samples.filter(item =>item.id == ID)
        console.log(samples)
        //Remix `otu_ids`,`sample_values`,`otu_labels` data into a new Object
        let RemixObject = []
        for (let i=0;i<=samples[0].otu_ids.length;i++){
            let otu_ids_remix = samples[0].otu_ids[i]
            let sample_values_remix = samples[0].sample_values[i]
            let otu_labels_remix = samples[0].otu_labels[i]
            let RemixData = {'otu_ids':otu_ids_remix,'sample_values':sample_values_remix,'otu_labels':otu_labels_remix}
            RemixObject.push(RemixData)
        }
        console.log(RemixObject)

        // Plot the bubble chart
        let trace = {
            x: RemixObject.map(object => object.otu_ids),
            y: RemixObject.map(object => object.sample_values),
            mode: 'markers',
            marker:{
                size:RemixObject.map(object => object.sample_values),
                color:RemixObject.map(object => object.otu_ids),
                colorscale: "Earth"
            },
            text: RemixObject.map(object => object.otu_labels),
        };
                      
        let data = [trace];
                      
        let layout = {
            xaxis: {title:{text:"OTU ID"}}
        };
                      
        Plotly.newPlot("bubble", data, layout);


    })
};
// //Test function bubblechart
// bubblechart(940)

//====================================================================================================================================
//
function Initialization(){
    let ID = 940
    demographicInfo(ID)
    barchart(ID)
    bubblechart(ID)
}
Initialization();

function optionChanged(ID){
    demographicInfo(ID)
    barchart(ID)
    bubblechart(ID)
};

