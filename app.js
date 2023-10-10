
var button = document.getElementById('button');

class Product{
    constructor(imageurl, title, price){
        this.title=title;
        this.price=price;
        this.imageurl=imageurl;
    }
};

var products;

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        console.log(typeof(data[0]));
       
        const productsData = data; 
        //console.log(productsData);

            products = productsData.map(product => {
            return new Product(product.image,product.title, product.price);
         });
        console.log(typeof(products[0]));

        products.map(product => {
            document.getElementById('jsRow').innerHTML += `<div class="col col-md-4">
            <div class="card" id="productCard" style="width: 14rem;">
                <img src="${product.imageurl}" class="card-img-top" alt="...">
                <div class="card-body" id="body">
                    <p class="card-text"><h6>${product.title}</h6>
                    <p>Price: ${product.price}</p>
                </div>
            </div> 
            </div>`;
            
        });

    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

fetchProducts();

//----------------------------------------------------------------------------------------------------


//GET POSTS
async function fetchPosts(){
try {
    const response = await fetch('http://localhost:3000/posts');
    const data = await response.json();
    console.log(data);

    data.map(d => {
        console.log(d.id);
        document.getElementById('jsRow1').innerHTML += `<div class="card w-75 mb-5">
        <div class="card-body">
          <h5 class="card-title" id="idd">${d.id}</h5>
          <p class="card-text">${d.title}</p>
          <a  class="btn btn-dark" onclick="deleteCard(${d.id})" >Delete</a>
          <a  class="btn btn-primary" onclick="updateCard(${d.id})" ">Update</a>
        </div>
      </div>`;
        
    });

} catch (error) {
    console.error('Error fetching products:', error);
}
}


fetchPosts();

//POST A POST 
button.addEventListener("click", function(){
    var post=document.getElementById("validationTextarea").value;

    fetch('http://localhost:3000/posts',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            } ,
            body:JSON.stringify(
                {
                    id:"",
                    title: post
                    
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))

            document. location. reload();
})


//DELETE A CARD 
function deleteCard(productId){
    fetch(`http://localhost:3000/posts/${productId}`,{
            method:"DELETE"
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
            document. location. reload();
          
            
}



//UPDATE A CARD
function updateCard(productId){
    newPost=prompt("update your comment");
    console.log(newPost)
     fetch(`http://localhost:3000/posts/${productId}`,{
             method:"PUT",
             headers: {
                'Content-Type': 'application/json'
            } ,
             body: JSON.stringify(
                {
                    title: newPost
                } )
         })
             .then(res=>res.json())
             .then(json=>console.log(json))
             document.location.reload();
           
             
 }
