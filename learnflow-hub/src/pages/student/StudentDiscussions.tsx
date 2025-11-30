import { useState } from 'react';
import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageSquare, Plus, User } from 'lucide-react';
import { mockDiscussions } from '@/data/mockData';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function StudentDiscussions() {
  const [discussions, setDiscussions] = useState(mockDiscussions);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const handleAddPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }

    const newPost = {
      id: `d${Date.now()}`,
      courseId: undefined,
      title: newPostTitle,
      content: newPostContent,
      author: 'Student User',
      authorId: '1',
      createdAt: new Date().toISOString(),
      replies: [],
      views: 0,
    };

    setDiscussions([newPost, ...discussions]);
    setNewPostTitle('');
    setNewPostContent('');
    toast.success('Discussion post created!');
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Discussions</h2>
            <p className="text-muted-foreground">Ask questions and engage with the community</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Discussion Post</DialogTitle>
                <DialogDescription>
                  Share your question or thoughts with the community
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter post title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your question or post content..."
                    rows={6}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddPost} className="w-full">
                  Post Discussion
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {discussions.map((discussion) => (
            <Card key={discussion.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{discussion.title}</CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {discussion.author}
                      </span>
                      <span>{format(new Date(discussion.createdAt), 'MMM dd, yyyy HH:mm')}</span>
                      <span>{discussion.views} views</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4 whitespace-pre-wrap">{discussion.content}</p>
                
                {discussion.replies.length > 0 && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <h4 className="font-semibold text-sm">
                      {discussion.replies.length} {discussion.replies.length === 1 ? 'Reply' : 'Replies'}
                    </h4>
                    {discussion.replies.map((reply) => (
                      <div key={reply.id} className="pl-4 border-l-2 border-muted">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{reply.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(reply.createdAt), 'MMM dd, yyyy HH:mm')}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                <Button variant="outline" size="sm" className="mt-4">
                  Reply
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {discussions.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No discussions yet</h3>
              <p className="text-muted-foreground text-center">
                Start a discussion by creating your first post
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  );
}

