package domain

type Item struct {
	Id          uint   `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Closed      bool   `json:"closed"`
}
