import matplotlib.pyplot as plt
from matplotlib.patches import Circle
import pygame


pygame.mixer.init()


pygame.mixer.music.load("hover.mp3")  


fig, ax = plt.subplots()
circles = []
circles.append(Circle((0.2, 0.85), 0.01, color='black'))
circles.append(Circle((0.3, 0.85), 0.01, color='black'))
circles.append(Circle((0.3, 0.80), 0.01, color='black'))
circles.append(Circle((0.4, 0.85), 0.01, color='black'))
circles.append(Circle((0.43, 0.85), 0.01, color='black'))
circles.append(Circle((0.5, 0.85), 0.01, color='black'))
circles.append(Circle((0.53, 0.85), 0.01, color='black'))
circles.append(Circle((0.53, 0.80), 0.01, color='black'))
circles.append(Circle((0.6, 0.85), 0.01, color='black'))
circles.append(Circle((0.63, 0.80), 0.01, color='black'))

for c in circles:
    ax.add_patch(c)

ax.text (0.2 , 0.6 , "1", fontsize=25)
ax.text (0.3 , 0.6 , "2", fontsize=25)
ax.text (0.4 , 0.6 , "3", fontsize=25)
ax.text (0.5 , 0.6 , "4", fontsize=25)
ax.text (0.6 , 0.6 , "5", fontsize=25)
ax.text (0.2 , 0.95 , "Hover over the dots", fontsize=25)

hovering = [False]

def on_hover(event):
    if event.inaxes == ax:
        over_any = any(c.contains(event)[0] for c in circles)
        if over_any and not hovering[0]:
            hovering[0] = True
            pygame.mixer.music.play()
        elif not over_any and hovering[0]:
            hovering[0] = False
            pygame.mixer.music.stop()
       
       
fig.canvas.mpl_connect('motion_notify_event', on_hover)


ax.set_xlim(0, 1)
ax.set_ylim(0, 1)
plt.show()
