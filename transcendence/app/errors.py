from django.shortcuts import render

def status_404(request):
    context = {"content": "404.html"}
    return render(request, "index.html", context)
