import RPi.GPIO as GPIO
import time
import datetime as dt;

PIR_SENSOR = 11
COOL_DOWN = (60 * 5)

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(PIR_SENSOR, GPIO.IN)

lastMove = dt.datetime.now()
state = -1

def toggleScreen(cmd):
  with open("/sys/class/backlight/rpi_backlight/bl_power", "w") as text_file:
    text_file.write(cmd)


while True:
  i = GPIO.input(PIR_SENSOR)
  now = dt.datetime.now()
  if i == 1:
    lastMove = now
    if state != 1:
      state = 1
      toggleScreen("0")
      print now, "ONNNNNNNNNNNNNNNNNNNNNNNNNNN!"
  elif i == 0 and state == 1 and (now - lastMove).seconds > COOL_DOWN:
    state = 0
    dateTime = now
    toggleScreen("1")
    print now, "offf"

  time.sleep(0.1)
