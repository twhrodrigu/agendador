# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "hashicorp/precise32"

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "provisioning/playbook.yml"
    ansible.sudo = true
    ansible.verbose = 'vv'
  end

  config.vm.synced_folder ".", "/vagrant/agenda-mvp/"

  config.vm.network "forwarded_port", guest: 8080, host: 8080, auto_correct: true
  config.vm.network "forwarded_port", guest: 9393, host: 9393, auto_correct: true

  if Vagrant.has_plugin?("vagrant-cachier")
    config.cache.scope = :box
  end
end
