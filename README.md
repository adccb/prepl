# installation && usage

clone the repo, `npm install` in the new directory, then run `npm start`

there are currently two commands, `against` and `my`. (`against` is aliased both to `a` and `an`.) each command takes a pokemon name, like:

## against
`against` will give you type information about a pokemon you're up against. like this!

```
> against growlithe
foe growlithe fire

double damage from   : ground | rock | water
double damage to     : bug | steel | grass | ice
half damage from     : bug | steel | fire | grass | ice | fairy
half damage to       : rock | fire | water | dragon
```

## my
`my` gives you information about the levels at which your pokemon learns certain moves. it looks like this!


```
> my rapidash

level-up
  1 | tail whip
  1 | growl
  1 | ember
  1 | quick attack
 19 | stomp
 25 | fire spin
 31 | take down
 38 | agility
 40 | fury attack
 50 | bounce
 63 | fire blast


tutor
  0 | body slam
  0 | double edge
  0 | mimic
  0 | substitute


machine
  0 | flamethrower
  0 | hyper beam
  0 | strength
  0 | solar beam
  0 | toxic
  0 | double team
  0 | rest
  0 | protect
  0 | attract
  0 | return
  0 | frustration
  0 | iron tail
  0 | hidden power
  0 | sunny day
  0 | facade
  0 | secret power
  0 | overheat
```

additionally, `my` supports an additional `jq`-style filter prop to drill down move learn methods:

```
> my rapidash .level-up

level-up
  1 | tail whip
  1 | growl
  1 | ember
  1 | quick attack
 19 | stomp
 25 | fire spin
 31 | take down
 38 | agility
 40 | fury attack
 50 | bounce
 63 | fire blast
```

