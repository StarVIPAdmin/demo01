1、安装 Git
2、安装 TotoiseGit (可选)
3、安装 smartGit（可选）

-- 生成SSH公私钥（用于上传/下载的凭证，可免密码输入）
4、右键 Git Bash Here 输入ssh-keygen，回车
5、执行之后，系统会要求输入2次密钥口令，不用管，直接回车跳过
6、直到出现下面的信息，说明成功生成公私钥
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/schacon/.ssh/id_rsa):
Created directory '/home/schacon/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/schacon/.ssh/id_rsa.
Your public key has been saved in /home/schacon/.ssh/id_rsa.pub.
The key fingerprint is:
d0:82:24:8e:d7:f1:bb:9b:33:53:96:93:49:da:9b:e3 schacon@mylaptop.local
7、接着在C:\Users\XXX\.ssh目录下，找到id_rsa, id_rsa.pub这2个文件，其中后缀是.pub的为公钥，把他发给我，我授权即可

-- 创建项目目录
8、在一个新的项目文件夹，然后右键 git bash here，输入命令行 “git init”
9、git pull https://github.com/StarVIPAdmin/demo01.git 拉取更新项目文件
10、提交流程：
	git add * 
	git commit -m "注释"
	git push
	或者使用 TotoiseGit / smartGit
