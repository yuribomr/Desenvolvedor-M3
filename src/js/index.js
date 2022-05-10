function attach(element, listener, ev, tf) {
  if (element.attachEvent) element.attachEvent("on" + listener, ev);
  else element.addEventListener(listener, ev, tf);
}

const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/products");
    return response.json();
  } catch (err) {
    console.log("getProducts", err);
  }
};

const loadProducts = async () => {
  const produtos = await getProducts();
  var all = produtos
    .map((val) => {
      return `  
      <div class="produto-single">
        <img class="produto-img" src=${val.image} />
        <div class="produto-name">${val.name.toUpperCase()}</div>
        <div class="produto-price">R$${val.price.toFixed(2)}</div>
        <div class="produto-parc">até ${
          val.parcelamento[0]
        }x de R$${val.parcelamento[1].toFixed(2)} </div>
          <button class="produto-button" id="adicionarCarrinho">COMPRAR</button>
      </div>
      `;
    })
    .join("");
  document.getElementById("produtos").innerHTML = all;
};

/* Mostrar Mais Cores */
var mostrarMais = document.querySelector(".mostrar-mais");
var corMobile = document.querySelectorAll("#mobile");
mostrarMais.addEventListener("click", () => {
  for (let i = 0; i < corMobile.length; i++) {
    if (corMobile[i].style.display !== "block") {
      corMobile[i].style.display = "block";
      mostrarMais.innerHTML = "Mostrar menos cores";
    } else {
      corMobile[i].style.display = "none";
      mostrarMais.innerHTML = "Ver todas as cores";
    }
  }
});

/* Filtro Cor */
var checkbox = document.querySelectorAll(".checkbox");
for (let i = 0; i < checkbox.length; i++) {
  checkbox[i].addEventListener("change", async (e) => {
    const produtos = await getProducts();
    const produtosA = produtos.filter((produto) => {
      return produto.color.includes(e.target.name);
    });
    if (checkbox[i].checked) {
      var all = produtosA
        .map((val) => {
          return `  
          <div class="produto-single">
            <img class="produto-img" src=${val.image} />
            <div class="produto-name">${val.name.toUpperCase()}</div>
            <div class="produto-price">R$${val.price.toFixed(2)}</div>
            <div class="produto-parc">até ${
              val.parcelamento[0]
            }x de R$${val.parcelamento[1].toFixed(2)} </div>
              <button class="produto-button" id="adicionarCarrinho">COMPRAR</button>
          </div>
          `;
        })
        .join("");
      document.getElementById("produtos").innerHTML = all;
    } else {
      loadProducts();
    }
  });
}

/* Filtro Tamanho */
var checkboxTamanho = document.querySelectorAll(".checkboxTamanho");
for (let i = 0; i < checkboxTamanho.length; i++) {
  checkboxTamanho[i].addEventListener("change", async (e) => {
    const produtos = await getProducts();
    const produtosA = produtos.filter((produto) => {
      return produto.size.includes(e.target.name);
    });
    if (checkboxTamanho[i].checked) {
      var all = produtosA
        .map((val) => {
          return `  
          <div class="produto-single">
            <img class="produto-img" src=${val.image} />
            <div class="produto-name">${val.name.toUpperCase()}</div>
            <div class="produto-price">R$${val.price.toFixed(2)}</div>
            <div class="produto-parc">até ${
              val.parcelamento[0]
            }x de R$${val.parcelamento[1].toFixed(2)} </div>
              <button class="produto-button" id="adicionarCarrinho">COMPRAR</button>
          </div>
          `;
        })
        .join("");
      document.getElementById("produtos").innerHTML = all;
    } else {
      loadProducts();
    }
  });
}

/* Filtro Preço */
var checkboxPreco = document.querySelectorAll(".checkboxPreco");
for (let i = 0; i < checkboxPreco.length; i++) {
  checkboxPreco[i].addEventListener("change", async (e) => {
    const produtos = await getProducts();
    const produtosA = produtos.filter((produto) => {
      return produto.price >= e.target.min && produto.price <= e.target.max;
    });
    if (checkboxPreco[i].checked) {
      var all = produtosA
        .map((val) => {
          return `  
          <div class="produto-single">
            <img class="produto-img" src=${val.image} />
            <div class="produto-name">${val.name.toUpperCase()}</div>
            <div class="produto-price">R$${val.price.toFixed(2)}</div>
            <div class="produto-parc">até ${
              val.parcelamento[0]
            }x de R$${val.parcelamento[1].toFixed(2)} </div>
              <button class="produto-button" id="adicionarCarrinho">COMPRAR</button>
          </div>
          `;
        })
        .join("");
      document.getElementById("produtos").innerHTML = all;
    } else {
      loadProducts();
    }
  });
}

/* Ordenar */
var ordernar = document.querySelector("#ordenar");
ordernar.addEventListener("change", async (e) => {
  if (e.target.value == 2) {
    const produtos = await getProducts();
    var sortProdutos = produtos.sort(function compare(a, b) {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    });
    var all = sortProdutos
      .map((val) => {
        return `  
        <div class="produto-single">
          <img class="produto-img" src=${val.image} />
          <div class="produto-name">${val.name.toUpperCase()}</div>
          <div class="produto-price">R$${val.price.toFixed(2)}</div>
          <div class="produto-parc">até ${
            val.parcelamento[0]
          }x de R$${val.parcelamento[1].toFixed(2)} </div>
            <button class="produto-button" id="adicionarCarrinho">COMPRAR</button>
        </div>
        `;
      })
      .join("");
    document.getElementById("produtos").innerHTML = all;
  } else if (e.target.value == 3) {
    const produtos = await getProducts();
    var sortProdutos = produtos.sort(function compare(a, b) {
      if (a.price > b.price) return 1;
      if (a.price < b.price) return -1;
      return 0;
    });
    var all = sortProdutos
      .map((val) => {
        return `  
        <div class="produto-single">
          <img class="produto-img" src=${val.image} />
          <div class="produto-name">${val.name.toUpperCase()}</div>
          <div class="produto-price">R$${val.price.toFixed(2)}</div>
          <div class="produto-parc">até ${
            val.parcelamento[0]
          }x de R$${val.parcelamento[1].toFixed(2)} </div>
            <button class="produto-button" id="adicionarCarrinho">COMPRAR</button>
        </div>
        `;
      })
      .join("");
    document.getElementById("produtos").innerHTML = all;
  } else {
    const produtos = await getProducts();
    var sortProdutos = produtos.sort(function compare(a, b) {
      if (a.price > b.price) return -1;
      if (a.price < b.price) return 1;
      return 0;
    });
    var all = sortProdutos
      .map((val) => {
        return `  
        <div class="produto-single">
          <img class="produto-img" src=${val.image} />
          <div class="produto-name">${val.name.toUpperCase()}</div>
          <div class="produto-price">R$${val.price.toFixed(2)}</div>
          <div class="produto-parc">até ${
            val.parcelamento[0]
          }x de R$${val.parcelamento[1].toFixed(2)} </div>
            <button class="produto-button" id="adicionarCarrinho">COMPRAR</button>
        </div>
        `;
      })
      .join("");
    document.getElementById("produtos").innerHTML = all;
  }
});

loadProducts();
