$(document).ready(function () {

  // دالة لإظهار/إخفاء التفاصيل
  function toggleDetails() {
    $(".show-details-btn").off("click").on("click", function() {
      const targetId = $(this).data("target");
      const $row = $("#" + targetId);
      $row.toggle();
      $(this).text($row.is(":visible") ? "إخفاء التفاصيل" : "إظهار التفاصيل");
    });
  }
  toggleDetails();

  // إضافة التطبيقات في add_app.html
  if (window.location.pathname.endsWith("add_app.html")) {
    $("#submitBtn").on("click", function () {
      const name = $("#appName").val().trim();
      const company = $("#company").val().trim();
      const website = $("#website").val().trim();
      const free = $("#free").val();
      const field = $("#field").val();
      const desc = $("#description").val().trim();

      const namePattern = /^[A-Za-z\s]+$/;
      const companyPattern = /^[A-Za-z\s]+$/;
      const urlPattern = /^(https?:\/\/)([^\s.]+\.[^\s]{2,}|localhost[:?\d]*)\S*$/i;

      if (!namePattern.test(name)) { alert("❌ اسم التطبيق يجب أن يحتوي على أحرف إنجليزية فقط"); return; }
      if (!companyPattern.test(company)) { alert("❌ اسم الشركة يجب أن يحتوي على أحرف إنجليزية فقط"); return; }
      if (!urlPattern.test(website)) { alert("❌ الرجاء إدخال رابط موقع صالح يبدأ بـ http أو https."); return; }
      if (desc.length < 10) { alert("❌ الرجاء إدخال وصف لا يقل عن 10 أحرف."); return; }

      const newApp = { name, company, website, free, field, desc };
      const apps = JSON.parse(localStorage.getItem("apps")) || [];
      apps.push(newApp);
      localStorage.setItem("apps", JSON.stringify(apps));

      alert("✅ تم حفظ التطبيق بنجاح! سيتم نقلك إلى صفحة التطبيقات.");
      window.location.href = "Appliances.html";
    });

    $("#resetBtn").on("click", function () {
      $("#appForm")[0].reset();
    });
  }

  // عرض التطبيقات المخزنة في Appliances.html
  if (window.location.pathname.endsWith("Appliances.html")) {
    const apps = JSON.parse(localStorage.getItem("apps")) || [];
    const $dynamicTable = $("#dynamicApps");
    const template = document.getElementById("appTemplate");

    apps.forEach((app, index) => {
      const clone = template.content.cloneNode(true);

      $(clone).find(".app-name").text(app.name);
      $(clone).find(".app-company").text(app.company);
      $(clone).find(".app-field").text(app.field);
      $(clone).find(".app-free").text(app.free === "مجاني" ? "✅" : "❌");
      $(clone).find(".app-desc").text(app.desc);
      $(clone).find(".app-website").attr("href", app.website).text(app.website);

      const detailsId = `dynamicApp${index+1}`;
      $(clone).find(".app-details").attr("id", detailsId);
      $(clone).find(".show-details-btn").attr("data-target", detailsId);

      $dynamicTable.append(clone);
    });

    // تفعيل أزرار التفاصيل بعد إضافة كل التطبيقات
    toggleDetails();
  }
});
