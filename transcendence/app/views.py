from django.shortcuts import render
from .forms import LoginForm

def status_404(request):
    context = {}
    return render(request, "404.html", context)

def index(request):
    context = {}
    return render(request, "index.html", context)

def main(request):
    context = {}
    return render(request, "main.html", context)

def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            print(username, password)
            #user = authenticate(request, username=username, password=password)
            #if user:
             #   login(request, user)
             #   return redirect('home')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

