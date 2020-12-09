const PAGINATION_ITEMS_PER_PAGE = document.querySelectorAll("#id-pagination-data > div").length;


$(function () {
  // Latest section
  pagination();
});


function pagination() {
  populate_data_for_pagination();
  pagination_setup_page(1);
}


function populate_data_for_pagination() {
  const data_items = document.querySelectorAll("#id-pagination-data > div");

  for (let page_no = 1; page_no < 12; page_no++) {
    data_items.forEach(function (item) {
      const cloned_item = item.cloneNode(true);
      const page_no_str = "<<<<<<<< PAGE NO " + (page_no + 1) + " >>>>>>>> ";
      cloned_item.querySelector('div a p').innerHTML = page_no_str + cloned_item.querySelector('div a p').innerHTML;
      document.querySelector("#id-pagination-data").appendChild(cloned_item);
    });
  }
}


function pagination_setup_page(page_no) {
  if (page_no === "<" || page_no === ">") {
    let current_page_no = document.querySelector("#id-pagination-nav > ul > li.active > a").text;
    current_page_no = parseInt(current_page_no);

    if (page_no === ">") {
      pagination_setup_page(current_page_no + 1);
    } else {
      pagination_setup_page(current_page_no - 1);
    }
    return;
  }

  page_no = parseInt(page_no);

  const pagination_items = document.querySelectorAll("#id-pagination-nav > ul > li");
  pagination_items.forEach(function (item) {
    item.classList.add("d-none");
    item.classList.remove("active");
  });

  document.querySelector("#id-pagination-" + page_no).classList.add("active");

  document.querySelector("#id-pagination-lt").classList.remove("d-none");
  document.querySelector("#id-pagination-1").classList.remove("d-none");
  document.querySelector("#id-pagination-12").classList.remove("d-none");
  document.querySelector("#id-pagination-gt").classList.remove("d-none");

  document.querySelector("#id-pagination-lt a").classList.remove("disabled-dot");
  document.querySelector("#id-pagination-gt a").classList.remove("disabled-dot");

  if ([1, 2, 3, 11, 12].includes(page_no)) {
    document.querySelector("#id-pagination-2").classList.remove("d-none");
    document.querySelector("#id-pagination-3").classList.remove("d-none");
    document.querySelector("#id-pagination-dots-2").classList.remove("d-none");
    document.querySelector("#id-pagination-11").classList.remove("d-none");
    if (page_no === 1) {
      document.querySelector("#id-pagination-lt a").classList.add("disabled-dot");
    } else if (page_no === 12) {
      document.querySelector("#id-pagination-gt a").classList.add("disabled-dot");
    }
  } else {
    document.querySelector("#id-pagination-dots-1").classList.remove("d-none");
    document.querySelector("#id-pagination-" + page_no).classList.remove("d-none");
    document.querySelector("#id-pagination-" + (page_no + 1)).classList.remove("d-none");
    document.querySelector("#id-pagination-dots-3").classList.remove("d-none");
  }

  const enable_start_idx = (page_no - 1) * PAGINATION_ITEMS_PER_PAGE;
  const enable_end_idx = page_no * PAGINATION_ITEMS_PER_PAGE;

  const data_items = document.querySelectorAll("#id-pagination-data > div");

  data_items.forEach(function (item) {
    item.classList.add("d-none");
  });

  for (let idx = enable_start_idx; idx < enable_end_idx; idx++) {
    data_items[idx].classList.remove("d-none");
  }
}
