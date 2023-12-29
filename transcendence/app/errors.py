from django.shortcuts import render

def status_404(request):
    context = {}
    return render(request, "404.html", context)
