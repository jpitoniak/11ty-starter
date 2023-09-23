<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{% if title %}{{ title }} :: {% endif %}{{ site.site_title }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="{{ site.baseurl }}/css/site.css">

    <script src="js/site.js" defer></script>
  </head>
  <body>
    {%  include "header.md" %}
    <main>
        {{ content }}
    </main>
    {% include "footer.md" %}
  </body>
</html>
