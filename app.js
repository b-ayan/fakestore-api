
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
        // Take the first 20 products
        const productsData = data.slice(0, 20); 
        //console.log(productsData);

        // Create Product objects from the API data and assign it to 'products' array
            products = productsData.map(product => {
            return new Product(product.image,product.title, product.price);
         });
        console.log(typeof(products[0]));

        products.map(product => {
            document.getElementById('jsRow').innerHTML += `<div class="col col-md-4">
            <div class="card card1" style="width: 14rem;">
                <img src="${product.imageurl}" class="card-img-top" alt="...">
                <div class="card-body card-body1">
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




async function fetchPosts(){
try {
    const response = await fetch('http://localhost:3000/posts');
    const data = await response.json();
    console.log(data);
    // Take the first 20 products
    // const productsData = data.slice(0, 20); 
    //console.log(productsData);

    // Create Product objects from the API data and assign it to 'products' array
    //     products = productsData.map(product => {
    //     return new Product(product.image,product.title, product.price);
    //  });
    // console.log(typeof(products[0]));

    data.map(d => {
        document.getElementById('jsRow1').innerHTML += `<div class="card w-75 mb-5">
        <div class="card-body">
          <h5 class="card-title" id="idd">${d.id}</h5>
          <p class="card-text">${d.title}</p>
          <a href="#" class="btn btn-dark" id="delete">Delete</a>
        </div>
      </div>`;
        
    });

} catch (error) {
    console.error('Error fetching products:', error);
}
}

fetchPosts();


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

            fetchPosts();
})

fetchProducts();

idd=document.getElementById("idd")
function deleteCard(){
    fetch('http://localhost:3000/posts/${idd}',{
            method:"DELETE"
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
            fetchPosts();
            
}

deleteBtn=document.getElementById('delete');

deleteBtn.addEventListener("click", function(){
    deleteCard();
})